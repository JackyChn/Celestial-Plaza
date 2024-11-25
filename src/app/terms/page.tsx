import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for using our services",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl space-y-10 px-5 py-10 leading-7">
      <div className="mx-auto text-center">
        <h2 className="py-5 text-3xl">CUSTOMER CARE</h2>
        <p>
          Our Customer Care team at [Shopping Mall Name] is dedicated to
          ensuring your shopping experience is seamless, enjoyable, and
          memorable. Located conveniently on the ground floor, our friendly and
          professional staff are ready to assist with any inquiries, directions,
          or special requests. From helping you locate your favorite stores and
          managing lost and found items to addressing any feedback or concerns,
          we are here to make your visit as smooth as possible. Additionally, we
          offer services such as gift card purchases, wheelchair assistance, and
          information on exclusive mall events and promotions. Your satisfaction
          is our priority—visit Customer Care for unparalleled service tailored
          to your needs.
        </p>
        <p>
          Our Customer Care team is here to make your visit effortless and
          enjoyable. From assisting with store directions to handling inquiries
          and special requests, we&apos;re dedicated to ensuring a seamless
          shopping experience. Visit us on the ground floor for friendly and
          reliable support.
        </p>
        <h2 className="mt-10 py-5 text-3xl">PRIVACY & SAFETY</h2>
        <p>
          At Celestial Plaza, your privacy and safety are our top priorities. We
          are committed to protecting your personal information and ensuring a
          secure environment for all visitors. Our facilities are equipped with
          advanced surveillance systems, and our security team works around the
          clock to maintain a safe and welcoming atmosphere. We adhere to strict
          data protection policies, ensuring any personal details you provide
          are handled with the utmost care and in compliance with privacy laws.
          Should you have any concerns or require assistance, our Customer Care
          team is always available to help. Your trust and well-being are our
          commitment.
        </p>
        <p>
          With 24/7 security and strict data protection policies, we ensure a
          secure and welcoming environment for all visitors.
        </p>
        <h2 className="mt-10 py-5 text-3xl">WHOLESALE INQUIRIES</h2>
        <p>
          We welcome wholesale inquiries and are dedicated to supporting bulk
          buyers and businesses. Whether you&apos;re looking for exclusive
          deals, bulk pricing, or tailored packages, our team is here to assist
          you. We partner with retailers across various industries, ensuring a
          diverse range of products to meet your needs. For more information or
          to discuss your requirements, please contact our Wholesale Team
          directly through our website or visit Customer Care. Let us help you
          grow your business with our exceptional wholesale services.
        </p>
        <p>
          Celestial Plaza offers tailored solutions for wholesale buyers,
          including bulk pricing and exclusive deals. Contact our Wholesale Team
          or visit Customer Care to learn more and explore opportunities.
        </p>
        <h2 className="mt-10 py-5 text-3xl">PAYMENT METHODS</h2>
        <p>
          - Credit / Debit Cards
          <br /> - PAYPAL
          <br /> - Offline Payments
        </p>
      </div>
    </main>
  );
}
