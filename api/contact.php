<?php
// api/contact.php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Require Composer autoloader deployed by vercel-php
require __DIR__ . '/../vendor/autoload.php';

// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit();
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid JSON payload"]);
    exit();
}

// Sanitize Inputs
$name = isset($data['name']) ? htmlspecialchars(strip_tags($data['name'])) : '';
$email = isset($data['email']) ? filter_var($data['email'], FILTER_SANITIZE_EMAIL) : '';
$phone = isset($data['phone']) ? htmlspecialchars(strip_tags($data['phone'])) : '';
$company = isset($data['company']) ? htmlspecialchars(strip_tags($data['company'])) : '';
$product = isset($data['product']) ? htmlspecialchars(strip_tags($data['product'])) : '';
$message = isset($data['message']) ? htmlspecialchars(strip_tags($data['message'])) : '';
$recaptchaToken = isset($data['recaptchaToken']) ? $data['recaptchaToken'] : '';

if (empty($name) || empty($email)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Name and email are required."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid email address."]);
    exit();
}

// Verify reCAPTCHA
function verifyRecaptchaToken($token) {
    $secret = getenv('RECAPTCHA_SECRET_KEY');
    if (!$secret || empty($token)) return false;
    
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $post_data = http_build_query([
        'secret' => $secret,
        'response' => $token
    ]);
    
    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => $post_data
        ]
    ];
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result === FALSE) return false;
    
    $response = json_decode($result, true);
    return ($response['success'] === true && isset($response['score']) && $response['score'] > 0.5);
}

if ($recaptchaToken) {
    if (!verifyRecaptchaToken($recaptchaToken)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "reCAPTCHA verification failed."]);
        exit();
    }
}

// Credentials
$smtpUser = getenv('GMAIL_USER') ?: 'pateljeni3110@gmail.com';
$smtpPass = getenv('GMAIL_APP_PASSWORD') ?: '';

$logoUrl = "https://ardira.com/ArdiraLogo.png";

// Email Template Builder
function buildEmailTemplate($headingText, $rowsHtml) {
    global $logoUrl;
    return "<!DOCTYPE html>
<html>
<head><title></title></head>
<body>
  <table cellspacing='0' cellpadding='0' border='0' width='650' align='center'
    style='border:1px solid #e2e2e2;color:#13324b;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:normal;'>
    <tr>
      <td align='center' valign='top'>
        <table cellspacing='0' cellpadding='0' width='100%' align='center' style='color:#000000;font-size:12px;'>
          <tr>
            <td valign='top' bgcolor='#f4f9fb' style='text-align:center;padding:16px 0;border-bottom:1px solid #e2e2e2;'>
              <a href='https://ardira.com' title='Ardira' target='_blank'>
                <img src='{$logoUrl}' style='display:block;margin:0 auto;padding:10px 0;' width='120' border='0' alt='Ardira' title='Ardira' />
              </a>
            </td>
          </tr>
          <tr>
            <td style='padding:16px;' align='center' valign='top'>
              <table width='100%' cellspacing='0' cellpadding='0' align='center' style='font-size:12px;color:#333;'>
                <tr>
                  <td align='left' style='padding:10px 0;font-size:12px;'>
                    <strong style='font-size:18px;color:#333;font-family:Arial,Helvetica,sans-serif;'>
                      {$headingText}
                    </strong>
                  </td>
                </tr>
                <tr><td height='8'></td></tr>
                <tr>
                  <td width='100%'>
                    <table width='100%' align='center' cellpadding='0' cellspacing='0'
                      style='font-size:13px;color:#666666;border-collapse:collapse;border:1px solid #ccc;border-bottom:0;'>
                      <tbody>
                        {$rowsHtml}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table cellpadding='0' cellspacing='0' border='0' width='100%'
                style='line-height:18px;padding:10px;border-top:solid 1px #e2e2e2;' bgcolor='#f4f9fb'>
                <tr>
                  <td align='left' style='text-align:left;font-size:12px;font-family:Arial,Helvetica,sans-serif;'>
                    <strong>Thanks &amp; Regards</strong><br />
                    Ardira Team<br />
                    <strong>Address:</strong> 2040 Martin Ave, Santa Clara, CA 95050, United States<br />
                    <strong>Phone:</strong> 1.669.777.6838<br />
                    <strong>Email:</strong>
                    <a href='mailto:info@ardira.com' style='color:#000;'>info@ardira.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>";
}

function buildRowsHtml($rows) {
    $html = "";
    foreach ($rows as $row) {
        $label = $row['label'];
        $value = $row['value'];
        $html .= "<tr>
          <td style='color:#000;font-family:Arial,Helvetica,sans-serif;padding:10px;border-right:1px solid #ccc;border-bottom:1px solid #ccc;width:34%;'><strong>{$label}:</strong></td>
          <td style='font-family:Arial,Helvetica,sans-serif;padding:10px;border-bottom:1px solid #ccc;width:66%;'>{$value}</td>
        </tr>";
    }
    return $html;
}

$displayPhone = $phone ?: "—";
$displayCompany = $company ?: "—";
$displayProduct = $product ?: "—";
$displayMessage = $message ? nl2br($message) : "—";

$internalRows = [
    ['label' => 'Name', 'value' => $name],
    ['label' => 'Email', 'value' => "<a href='mailto:{$email}' style='color:#43AF57;'>{$email}</a>"],
    ['label' => 'Contact Number', 'value' => $displayPhone],
    ['label' => 'Company', 'value' => $displayCompany],
    ['label' => 'Product Interest', 'value' => $displayProduct],
    ['label' => 'Message', 'value' => $displayMessage],
];

$prospectRows = [
    ['label' => 'Name', 'value' => $name],
    ['label' => 'Email', 'value' => $email],
    ['label' => 'Contact Number', 'value' => $displayPhone],
    ['label' => 'Message', 'value' => $displayMessage],
];

$salesBody = buildEmailTemplate("Following message received via contact us form", buildRowsHtml($internalRows));
$prospectBody = buildEmailTemplate("We have received your details, one of our representative will get in touch with you shortly.", buildRowsHtml($prospectRows));

function sendMail($to, $cc, $subject, $body, $smtpUser, $smtpPass, $replyToEmail = null) {
    if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        return "PHPMailer library is not loaded. Make sure composer dependencies are installed.";
    }

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtpUser;
        $mail->Password   = str_replace(' ', '', $smtpPass); 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom($smtpUser, 'Ardira Sales');
        $mail->addAddress($to);
        if ($cc) {
            $mail->addCC($cc);
        }
        if ($replyToEmail) {
            $mail->addReplyTo($replyToEmail, $replyToEmail);
        }

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $body;
        
        $mail->send();
        return true;
    } catch (Exception $e) {
        return "Error: {$mail->ErrorInfo}";
    }
}

$errors = [];

if (empty($smtpPass)) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Server email configuration is missing (GMAIL_APP_PASSWORD)"]);
    exit();
}

$subjectSales = "Inquiry from Ardira website";
$subjectProspect = "Thank You for contacting us regarding Ardira";
$TEAM_EMAIL = $smtpUser;

// 1. Send internal copy to Sales Team
$salesResult = sendMail($TEAM_EMAIL, null, $subjectSales, $salesBody, $smtpUser, $smtpPass, $email);
if ($salesResult !== true) {
    $errors[] = "Sales email failed: " . $salesResult;
}

// 2. Send Auto-Responder to the Prospect (Submitter)
$prospectResult = sendMail($email, null, $subjectProspect, $prospectBody, $smtpUser, $smtpPass, $TEAM_EMAIL);
if ($prospectResult !== true) {
    $errors[] = "Prospect email failed: " . $prospectResult;
}

if (!empty($errors)) {
    http_response_code(500);
    echo json_encode(["status" => "error", "error" => "Partial or total mail failure.", "details" => $errors]);
} else {
    http_response_code(200);
    echo json_encode(["status" => "success", "success" => true, "message" => "Form submitted successfully"]);
}
