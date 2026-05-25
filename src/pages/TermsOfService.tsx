import SEO from "../components/SEO";
import StructuredData from "../components/StructuredData";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white text-[#0f172a] font-sans flex flex-col">
      <SEO
        title="Terms of Use | Ardira"
        description="Read the Terms of Use for Ardira, outlining the rules and guidelines for using our website and products."
        keywords="terms of use, terms of service, Ardira terms"
        ogTitle="Ardira Terms of Use"
        ogDescription="Terms and conditions for using Ardira's website and services."
        ogUrl="https://ardira.com/terms-of-use"
        ogImage="https://ardira.com/ArdiraLogo.webp"
        ogImageWidth="512"
        ogImageHeight="512"
        ogImageType="image/webp"
        ogLogo="https://ardira.com/ArdiraLogo.webp"
      />
      <StructuredData type="WebPage" name="Terms of Use" description="Ardira's Terms of Use." url="https://ardira.com/terms-of-use" />
      <main className="flex-grow w-full responsive-section">
        <div style={{
          maxWidth: "var(--max-width)",
          margin: "0 auto",
          paddingTop: 48,
          paddingBottom: 48
        }}>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-10 text-[#43AF57]">
            Terms of Use
          </h1>

          <div className="space-y-8 text-slate-600 leading-relaxed text-sm md:text-base font-normal">
          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0f172a] mb-4">
              Ardira Terms and Conditions
            </h2>
            <p className="mb-4">
              The website located at <a
                href="https://www.ardira.com"
                className="text-emerald-600 hover:text-emerald-700 underline"
              >
              www.ardira.com
              </a>, (the "Website") is
              published, owned, and operated by Ardira Corporation, its
              affiliates and related entities ("Ardira", "the Company," "we,"
              "us," and "our"). These Terms of Use (the "Terms") govern your
              access to and use of the Website.
            </p>
            <p className="mb-4">
              By accessing, browsing, submitting information to and/or using the
              Website, you agree and acknowledge on your own behalf (referred to
              throughout the Terms as "you") that you have read, understand and
              agree to be bound by these Terms and to comply with all applicable
              laws including, without limitation, all federal, state and local
              tax and tariff laws, regulations, and/or directives. If you do not
              agree to the Terms, please do not use the Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0f172a] mb-4">
              Purpose of the Website
            </h2>
            <p className="mb-4">
              The Website are provided solely for informational purposes and the
              purposes of enabling communication between you and the Company.
              The information provided is intended to be general in nature and
              does not necessarily address all the terms, exclusions, and
              conditions applicable to our products and services.
            </p>
            <p className="mb-4">
                We do not warrant the accuracy, completeness, or usefulness of
                this information at any particular time. Any reliance you place
                on such information is strictly at your own risk. The Company
                disclaims all liability and responsibility arising from any
                reliance placed on such content by you or any other visitor to
                our Website, or by anyone who may be informed of any of its
                contents. Any information you provide or that is collected by
                the Company through the Website shall be handled in accordance
                with the Website's{" "}
                <a
                  href="/privacy-policy"
                  className="text-emerald-600 hover:text-emerald-700 underline"
                >
                  Privacy Policy
                </a>
                , which is hereby incorporated by reference.
              </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0f172a] mb-4">
              Use of the Website
            </h2>
            <p className="mb-4">
              The Company grants you a non-exclusive right to access and use the
              Website and the data, material, content or information herein
              (collectively, the "Content") solely for your personal use. Your
              right to access and use the Website shall be limited to
              non-commercial purposes unless you are otherwise expressly
              authorized by the Company to use the Website for commercial
              purposes. You agree to use the Website only for lawful purposes,
              comply with all rules governing any transactions on and through
              the Website and comply with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0f172a] mb-4">
              Prohibited Uses
            </h2>
            <p className="mb-3 font-semibold text-slate-700">
              You agree that you will not:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>
                Use the Website in any manner that could damage, disable,
                overburden, or impair the Website or interfere with any other
                party's use and enjoyment of them;
              </li>
              <li>
                Attempt to gain unauthorized access to any Website account,
                computer systems or networks associated with the Company or the
                Website;
              </li>
              <li>
                Obtain or attempt to obtain any materials or information through
                the Website by any means not intentionally made available or
                provided by the Company;
              </li>
              <li>
                Use any robot, spider, or other automatic device, process or
                means to access the Website for any purpose, including
                monitoring or copying any of the material on the Website;
              </li>
              <li>
                Introduce any viruses, Trojan horses, worms, logic bombs, or
                other material which is malicious or technologically harmful;
              </li>
              <li>
                Attack the Website via a denial-of-service attack or a
                distributed denial-of-service attack; or
              </li>
              <li>
                Impersonate or attempt to impersonate the Company, a Company
                employee, another user or any other person or entity (including,
                without limitation, by using email addresses associated with any
                of the foregoing).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0f172a] mb-4">
              Third Party Sites
            </h2>
            <p className="mb-4">
              The Website may contain links to Website controlled or operated by
              persons and companies other than the Company ("Linked Sites").
              Linked Sites are not under the control of the Company, and the
              Company is not responsible for the contents of any Linked Site,
              including without limitation any link contained on a Linked Site,
              or any changes or updates to a Linked Site. The Company is not
              responsible if the Linked Site is not working correctly or for any
              viruses, malware, or other harms resulting from your use of a
              Linked Site. The Company is providing these links to you only as a
              convenience, and the inclusion of any link does not imply
              endorsement by the Company of the site or any association with its
              operators. You are responsible for viewing and abiding by the
              privacy policies and terms of use posted on the Linked Sites. You
              are solely responsible for any dealings with third parties who
              support the Company or are identified in the Website, including
              any delivery of and payment for goods and services.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0f172a] mb-4">
              Intellectual Property Notices
            </h2>
            <p className="mb-4">
              The Website and Content are protected by copyrights, trademarks,
              or are subject to other proprietary rights. Accordingly, you are
              not permitted to use the Website or Content in any manner, except
              as expressly permitted by the Company in these Terms. The Website
              or Content may not be copied, reproduced, modified, published,
              uploaded, posted, transmitted, performed, or distributed in any
              way, and you agree not to modify, rent, lease, loan, sell,
              distribute, transmit, broadcast, or create derivatives with the
              express written consent of the Company or applicable owner.
            </p>
            <p className="mb-4">
              You acknowledge and agree that you are solely responsible for
              complying with the applicable restrictions on use of all Content,
              copyrighted materials and trademarks that you see, hear, and use
              on the Website. You understand that any unauthorized use of such
              intellectual property would result in irreparable injury for which
              money damages would be inadequate. You further acknowledge that,
              in the event of any such unauthorized use, the Company or the
              applicable intellectual property owner will have the right, in
              addition to other remedies available at law and in equity, to
              immediate injunctive relief to prevent any such unauthorized use.
            </p>
            <p>
              Questions regarding the use of any intellectual property provided
              on the Website should be directed to{" "}
              <a
                href="mailto:legal@ardira.com"
                className="text-emerald-600 hover:text-emerald-700 underline"
              >
                legal@ardira.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0f172a] mb-4">
              Disclaimer
            </h2>
            <p className="uppercase text-xs font-semibold tracking-wide mb-4 leading-relaxed">
              ALL INFORMATION OR SERVICES PROVIDED BY THE COMPANY TO YOU VIA THE
              WEBSITE, INCLUDING, WITHOUT LIMITATION, ALL CONTENT, ARE PROVIDED
              "AS IS" AND "WHERE IS" AND WITHOUT ANY WARRANTIES OF ANY KIND. THE
              COMPANY AND ITS THIRD-PARTY LICENSORS EXPRESSLY DISCLAIM ALL
              WARRANTIES, WHETHER EXPRESS, IMPLIED OR STATUTORY, INCLUDING,
              WITHOUT LIMITATION, THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR
              A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. NOTWITHSTANDING
              ANY PROVISION CONTAINED HEREIN TO THE CONTRARY, THE COMPANY AND
              ITS THIRD-PARTY LICENSORS MAKE NO REPRESENTATION, WARRANTY OR
              COVENANT CONCERNING THE ACCURACY, QUALITY, SUITABILITY,
              COMPLETENESS, SEQUENCE, TIMELINESS, SECURITY OR AVAILABILITY OF
              THE WEBSITE OR ANY CONTENT POSTED ON OR OTHERWISE ACCESSIBLE VIA
              THE WEBSITE. YOU SPECIFICALLY ACKNOWLEDGE THAT THE COMPANY AND ITS
              THIRD-PARTY LICENSORS ARE NOT LIABLE FOR THE DEFAMATORY, OBSCENE
              OR UNLAWFUL CONDUCT OF OTHER THIRD PARTIES OR USERS OF THE WEBSITE
              AND THAT THE RISK OF INJURY FROM THE FOREGOING RESTS ENTIRELY WITH
              YOU. NEITHER THE COMPANY NOR ANY OF ITS THIRD-PARTY LICENSORS
              REPRESENT, WARRANTY OR COVENANT THAT THE WEBSITE WILL BE SECURE,
              UNINTERRUPTED OR ERROR-FREE. THE COMPANY FURTHER MAKES NO WARRANTY
              THAT THE WEBSITE WILL BE FREE OF VIRUSES, WORMS OR TROJAN HORSES
              OR THAT IT WILL FUNCTION OR OPERATE IN CONJUNCTION WITH ANY OTHER
              PRODUCT OR SOFTWARE. YOU EXPRESSLY AGREE THAT USE OF THE WEBSITE
              IS AT YOUR SOLE RISK AND THAT THE COMPANY, ITS AFFILIATES AND
              THEIR THIRD-PARTY LICENSORS SHALL NOT BE RESPONSIBLE FOR ANY
              TERMINATION, INTERRUPTION OF SERVICES, DELAYS, ERRORS, FAILURES OF
              PERFORMANCE, DEFECTS, LINE FAILURES, OR OMISSIONS ASSOCIATED WITH
              THE WEBSITE OR YOUR USE THEREOF. YOUR SOLE REMEDY AGAINST THE
              COMPANY FOR DISSATISFACTION WITH THE WEBSITE OR THE CONTENT IS TO
              CEASE YOUR USE OF THE WEBSITE AND/OR THE CONTENT.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0f172a] mb-4">
              Limitation of Liability
            </h2>
            <p className="uppercase text-xs font-semibold tracking-wide mb-4 leading-relaxed">
              INDIRECT, INCIDENTAL, CONSEQUENTIAL, PUNITIVE, SPECIAL OR
              EXEMPLARY DAMAGES (INCLUDING, WITHOUT LIMITATION, LOSS OF PROFITS,
              LOSS OF USE, LOSS OF DATA, LOSS OF INFORMATION OR PROGRAMS ON YOUR
              DATA HANDLING SYSTEM, TRANSACTION LOSSES, OPPORTUNITY COSTS,
              INTERRUPTION OF BUSINESS OR COSTS OF PROCURING SUBSTITUTE GOODS)
              RESULTING FROM, ARISING OUT OF OR IN ANY WAY RELATING TO THE
              WEBSITE, OR THE CONTENT, DATA, CONTENT OR INFORMATION ACCESSED VIA
              THE WEBSITE OR ANY HYPERLINKED WEBSITE, OR ANY DISRUPTION OR DELAY
              IN THE PERFORMANCE OF THE WEBSITE, REGARDLESS OF THE FORM OF THE
              CLAIM OR ACTION, WHETHER BASED ON CONTRACT, TORT, STRICT
              LIABILITY, STATUTE OR OTHERWISE, AND REGARDLESS OF WHETHER OR NOT
              SUCH DAMAGES WERE FORESEEN, UNFORESEEN OR FORESEEABLE, EVEN IF THE
              COMPANY OR ITS THIRD-PARTY LICENSORS HAVE BEEN ADVISED OF THE
              POSSIBILITY OF SUCH DAMAGES.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0f172a] mb-4">
              Indemnity
            </h2>
            <p className="mb-4">
              You agree to defend, indemnify and hold harmless the Company and
              its affiliates, licensors and service providers from and against
              any claims, liabilities, damages, judgments, awards, losses,
              costs, expenses or fees (including reasonable attorneys' fees)
              arising out of or relating to your violation of these Terms or
              your use of the Website, including, but not limited to, any use of
              the Website Content, services, or products other than as expressly
              authorized in these Terms or your use of any information obtained
              from the Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0f172a] mb-4">
              Termination and Restriction of Access
            </h2>
            <p className="mb-4">
              In its sole discretion, the Company may terminate or suspend your
              access to the Website for breach of these Terms. The Company shall
              not be liable for any losses or damages arising from any such
              termination of service.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0f172a] mb-4">
              Arbitration
            </h2>
            <p className="mb-4">
              At its sole discretion, the Company may require you to submit any
              disputes arising from use of the Website, or breach of these
              Terms, including disputes arising from or concerning their
              interpretation, violation, invalidity, non-performance, or
              termination, to final and binding arbitration under the Rules of
              Arbitration of the American Arbitration Association applying Ohio
              law. By using the Website, you hereby consent to submission of any
              dispute to be final and binding arbitration.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0f172a] mb-4">
              Limitation on Time to File Claims
            </h2>
            <p className="mb-4">
              Any cause of action or claim you may have arising out of or
              relating to these Terms or the Website must be commenced within
              one (1) year after the cause of action accrues, otherwise, such
              cause of action or claim is permanently barred.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0f172a] mb-4">
              Governing Law & Jurisdiction
            </h2>
            <p className="mb-4">
              These Terms are governed by the laws of the State of Ohio, U.S.A.
              You hereby irrevocably consent to the exclusive jurisdiction and
              venue of the courts in Cleveland, Ohio, U.S.A. in all disputes
              arising out of or relating to the use of the Website.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0f172a] mb-4">
              Changes to these Terms of Use
            </h2>
            <p className="mb-4">
              The Company may update or change these Terms from time to time in
              order to reflect changes in any offered services, changes in the
              law, or for other reasons as deemed necessary by the Company. The
              effective date of any Terms will be reflected in the "Last
              Revised" entry. Your continued use of the Website after any such
              change is communicated shall constitute your consent to such
              change(s).
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold text-[#0f172a] mb-4">
              General
            </h2>
            <p className="mb-4">
              You agree that no joint venture, partnership, employment, or
              agency relationship exists between you and the Company as a result
              of these Terms or use of the Website. You may not assign these
              Terms without the prior written consent of the Company in all
              instances. The Company may assign these Terms, in whole or in
              part, at any time. The Company's performance of this agreement is
              subject to existing laws and legal process, and nothing contained
              in these Terms is in derogation of the Company's right to comply
              with governmental, court, and law enforcement requests or
              requirements relating to your use of the Website or information
              provided to or gathered by the Company with respect to such use.
            </p>
            <p className="mb-4">
              If any part of these Terms are determined to be invalid or
              unenforceable pursuant to applicable law including, but not
              limited to, the warranty disclaimers and liability limitations set
              forth above, then the invalid or unenforceable provision will be
              deemed superseded by a valid, enforceable provision that most
              closely matches the intent of the original provision, and the
              remainder of these Terms shall continue in effect.
            </p>
            <p>
              These Terms, including the Privacy Policy and all other documents
              expressly incorporated herein by reference, constitute the entire
              agreement between you and the Company with respect to the Website,
              and supersede all prior or contemporaneous communications and
              proposals, whether electronic, oral, or written, between you and
              the Company. A printed version of these Terms and of any notices
              given in electronic form shall be admissible in judicial or
              administrative proceedings based upon or relating to this
              agreement to the same extent and subject to the same conditions as
              other business documents and records originally generated and
              maintained in printed form.
            </p>
          </section>
          </div>
        </div>
      </main>
    </div>
  );
}
