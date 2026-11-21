import Link from "next/link";

const questions = [
  {
    question: "How do I choose the best architect in Lucknow for my project?",
    answer:
      "Compare portfolios for projects similar to yours, speak with the design team and ask for client references where available. Discuss your site, budget and priorities, then compare written scopes covering drawings, revisions, approval assistance, site visits, fees and exclusions. The best fit depends on your project and how you prefer to work. You can explore our projects and discuss your brief with our Gomtinagar studio using the links below.",
  },
  {
    question: "Where is a+A Architects based, and where do you work?",
    answer:
      "Our studio is in Gomtinagar, Lucknow. We provide architecture and design services to clients across Uttar Pradesh and throughout India. Share your project location and requirements with us to discuss how we can help.",
  },
  {
    question: "Which services can I discuss with your studio?",
    answer:
      "You can approach a+A Architects for architecture and planning, architectural consultancy, map approval assistance, building exterior and facade design, interior design, and 3D design and visualization. Our services above outline the scope of each area.",
  },
  {
    question: "Can you help with building plan or map approval?",
    answer:
      "We assist with preparing drawings, coordinating submissions and addressing revisions with the relevant planning authority. Share the site location and any existing drawings so we can discuss the approval assistance your project needs.",
  },
  {
    question: "Can I enquire about interiors or facade design separately?",
    answer:
      "Yes. Interior design and building exterior and facade design are services offered by a+A Architects. Tell us which part of your home, workplace or building you would like to develop, and share any existing plans or photographs.",
  },
  {
    question: "How can 3D visualization help me review a design?",
    answer:
      "Our 3D views help you review a proposed building or interior before construction. They can be used to discuss spatial proportions, materials and design options with the project team.",
  },
  {
    question: "What should I share when making an enquiry?",
    answer:
      "Start with your project location, the service you need and a brief description of what you want to create. If available, include the plot or floor area, existing drawings, photographs, your intended budget and preferred timeline. You can begin with the details you already have.",
  },
];

export function ServiceQuestions() {
  return (
    <section aria-labelledby="service-questions" className="bg-background px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h2 id="service-questions" className="mb-8 text-3xl font-light md:text-4xl">
          Before we begin
        </h2>
        <div className="border-t border-border">
          {questions.map(({ question, answer }) => (
            <details key={question} className="border-b border-border py-5">
              <summary className="cursor-pointer text-lg font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">
                {question}
              </summary>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
                {answer}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm">
          <Link href="/contact" className="underline underline-offset-4">Discuss your project</Link>
          <Link href="/projects" className="underline underline-offset-4">Explore our projects</Link>
        </div>
      </div>
    </section>
  );
}
