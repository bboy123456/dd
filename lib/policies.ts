// Replace these pre-launch notices with the merchant's reviewed policies before enabling checkout.
export const policies: Record<
  string,
  {
    title: string;
    intro: string;
    sections: { heading: string; text: string }[];
  }
> = {
  shipping: {
    title: "Shipping & returns",
    intro:
      "We're preparing our store for launch. The following information describes what will be available before orders open.",
    sections: [
      {
        heading: "Shipping to your door",
        text: "We plan to serve customers in the United States. Eligible destinations, handling time, shipping rates, and delivery estimates will be published before launch and shown at checkout. We are not accepting orders or promising delivery dates at this stage.",
      },
      {
        heading: "Returns, with clear expectations",
        text: "Our return window, item eligibility, return address, return shipping responsibility, and refund timing will be published here before the store opens. Please review the final policy before placing an order.",
      },
      {
        heading: "A problem with your order?",
        text: "Once orders open, our contact page will provide customer support details. Please keep your order number and photos of any damaged packaging or items so our team can help.",
      },
    ],
  },
  privacy: {
    title: "Privacy",
    intro:
      "This is a pre-launch privacy notice, not the final policy for an operating store.",
    sections: [
      {
        heading: "Your shopping bag",
        text: "This preview stores product IDs and quantities in your browser's local storage so your bag remains available when you come back. You can remove items from the bag or clear this site's browser data at any time. If browser storage is unavailable, the bag may only last for the current visit.",
      },
      {
        heading: "Information during your visit",
        text: "Our hosting provider may process standard request information, such as IP address and browser information, to deliver and protect the website. This preview does not include advertising pixels or a newsletter signup. Our email link opens your own email application.",
      },
      {
        heading: "Before orders open",
        text: "The final policy must identify the operating business and contact details, explain order and payment data processing, name relevant service providers, and explain retention and applicable privacy rights. Order processing will take place through the store's WooCommerce checkout and selected payment provider.",
      },
    ],
  },
  terms: {
    title: "Terms of use",
    intro:
      "The shop is currently a preview. Products, illustrations, and prices in the sample collection are for demonstration.",
    sections: [
      {
        heading: "Preview availability",
        text: "Adding a sample product to your bag does not create an order, reserve stock, or enter into a purchase agreement. Checkout is disabled in preview mode and no payment is collected.",
      },
      {
        heading: "Product information",
        text: "Concept illustrations are not product photographs. Final specifications, materials, dimensions, warnings, pricing, and availability must be confirmed before any real product is offered for sale.",
      },
      {
        heading: "Before purchasing",
        text: "The final sales terms, business identity, support contact, shipping and return policies, tax treatment, and dispute provisions will be provided before the store opens. Please review them before placing an order.",
      },
    ],
  },
  faq: {
    title: "A few good questions",
    intro: "The little things you might be wondering.",
    sections: [
      {
        heading: "Can I place an order yet?",
        text: "Not during the store preview. You can explore the sample collection and try the shopping bag, but no payment will be taken. We'll make it clear when real products are ready to order.",
      },
      {
        heading: "What currency do you use?",
        text: "Prices are displayed in US dollars (USD). When the store opens, applicable shipping charges and taxes will be calculated during checkout.",
      },
      {
        heading: "Where are the sizes and materials?",
        text: "The sample collection uses concept illustrations. Final product pages will include the confirmed specifications and care information for each real item. Please do not use sample descriptions as sizing or safety guidance.",
      },
      {
        heading: "Will my bag be saved?",
        text: "Your bag is saved in this browser when local storage is available. It isn't linked to an account and won't automatically appear on another device. An item in your bag does not reserve inventory.",
      },
    ],
  },
};
