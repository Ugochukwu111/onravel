import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/app/config/site";

const faqSections = [
  {
    id: "shipping",
    title: "Shipping",
    questions: [
      {
        question: "Do you ship outside Nigeria?",
        answer:
          "We deliver across Nigeria. For international orders, contact us before placing your order so we can confirm delivery options and costs.",
      },
      {
        question: "How long will it take to get my order?",
        answer:
          "Delivery time depends on your location and whether your piece is ready-to-wear or made to order. We’ll confirm the estimated timeline when your order is placed.",
      },
      {
        question: "What shipping carriers do you use?",
        answer:
          "We work with reliable delivery partners, selected based on your destination. Your delivery details will be shared once your order is on its way.",
      },
      {
        question: "When does my pre-order item ship?",
        answer:
          "Pre-order timelines are listed with the item or confirmed when you order. We’ll keep you updated if anything changes.",
      },
    ],
  },
  {
    id: "customs",
    title: "Customs",
    questions: [
      {
        question: "Will I have to pay customs fees?",
        answer:
          "Customs duties and import taxes may apply to international orders. These charges are set by your local authorities and are the customer’s responsibility.",
      },
    ],
  },
  {
    id: "sizing",
    title: "Sizing",
    questions: [
      {
        question: "What sizes do you stock?",
        answer:
          "Available sizes vary by design. Check the size options on each product page, or contact us if you need help choosing a size.",
      },
      {
        question: "I am between sizes — what should I do?",
        answer:
          "If you’re between sizes, contact us with the item you’re interested in and we’ll help you find the best fit. Custom sizing may be available for selected pieces.",
      },
    ],
  },
  {
    id: "returns",
    title: "Order Returns",
    questions: [
      {
        question: "Can I return my product?",
        answer:
          "Return eligibility depends on the item and its condition. Please contact us as soon as possible with your order number and the reason for your request.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          "Email us with your order number and details of the issue. Our team will get back to you with the next steps.",
      },
      {
        question: "What is your refund policy?",
        answer:
          "Refunds are reviewed in line with our returns process. Contact us with your order details and we’ll explain the available options.",
      },
      {
        question: "Can I request a cancellation or exchange?",
        answer:
          "Please contact us as soon as possible. Whether we can make a change depends on the order’s production and delivery status.",
      },
    ],
  },
  {
    id: "currency",
    title: "Currency",
    questions: [
      {
        question: "What currency are payments taken in?",
        answer:
          "Prices are shown in Nigerian naira (₦). If you’re ordering from outside Nigeria, contact us for help with your order.",
      },
    ],
  },
];

const navigationItems = [
  ...faqSections.map(({ id, title }) => ({ id, title })),
  { id: "contact", title: "Send an email" },
];

export default function FAQ({ pageTop = false }: { pageTop?: boolean }) {
  return (
    <section
      className={`bg-white text-brand-black ${
        pageTop
          ? "page-top-padding pb-12 sm:pb-16"
          : "py-12 sm:py-16"
      }`}
      aria-label="Frequently asked questions"
    >
      <div className="container mx-auto w-full max-w-5xl px-5 sm:px-8">
        <h1 className="faq-page-title mb-8">FAQs</h1>
        <div className="grid gap-8 md:grid-cols-[minmax(220px,263px)_minmax(0,1fr)] md:gap-16">
          <nav
            aria-label="FAQ categories"
            className="h-fit border border-neutral-200 px-5 sm:px-6"
          >
            <ul className="flex gap-5 overflow-x-auto md:block md:overflow-visible">
              {navigationItems.map(({ id, title }) => (
                <li
                  key={id}
                  className="shrink-0 border-b border-neutral-200 last:border-b-0"
                >
                  {id === "contact" ? (
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="block py-3 text-sm text-neutral-600 transition-colors hover:text-brand-black md:py-3.5"
                    >
                      {title}
                    </a>
                  ) : (
                    <Link
                      href={`#${id}`}
                      className="block py-3 text-sm transition-colors hover:text-neutral-500 md:py-3.5"
                    >
                      {title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            {faqSections.map(({ id, title, questions }) => (
              <section
                key={id}
                id={id}
                className="scroll-mt-24 pb-4"
                aria-labelledby={`${id}-heading`}
              >
                <h2 id={`${id}-heading`} className="faq-section-heading mb-3">
                  {title}
                </h2>
                <div>
                  {questions.map(({ question, answer }) => (
                    <details
                      key={question}
                      className="group border-b border-neutral-200"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-2.5 text-xs leading-5 marker:hidden [&::-webkit-details-marker]:hidden">
                        <span>{question}</span>
                        <ChevronDown
                          aria-hidden="true"
                          className="size-3.5 shrink-0 transition-transform group-open:rotate-180"
                        />
                      </summary>
                      <p className="max-w-2xl pb-3 pr-6 text-xs leading-5 text-neutral-600">
                        {answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
            <span id="contact" className="block scroll-mt-24" />
          </div>
        </div>
      </div>
    </section>
  );
}
