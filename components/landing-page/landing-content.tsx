"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Thom",
    title: "Software Engineer",
    description:
      "We've used Brainbox for the last five years. Brainbox has completely surpassed our expectations.",
  },
  {
    id: 2,
    name: "Jonny",
    title: "Head of Marketing",
    description:
      "I am really satisfied with Brainbox. I was amazed at the quality. I wish I would have found it sooner.",
  },
  {
    id: 3,
    name: "Ed",
    title: "Social Media Manager",
    description:
      "I would be lost without Brainbox. Amazing customer service. Thanks Brainbox!",
  },
  {
    id: 4,
    name: "Philip",
    title: "Teacher",
    description:
      "After using Brainbox my business skyrocketed! I am completely blown away.",
  },
];

export default function LandingContent() {
  return (
    <div className="px-10 pb-20">
      <h2 className="mb-10 text-center text-4xl font-extrabold text-white">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {testimonials.map((item) => (
          <Card key={item.id} className="border-none bg-[#192339] text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-sm text-zinc-400">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="px-0 pt-4">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
