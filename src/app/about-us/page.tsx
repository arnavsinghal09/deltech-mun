// app/about/page.jsx
"use client";

import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {Carousel, CarouselContent, CarouselItem,CarouselPrevious,CarouselNext} from "../../components/ui/carousel2";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";

export default function AboutUs() {
  const slideData = [
    {
      src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/mun-pics/IMG_8713.jpg",
      alt: "DelTech MUN Event 1",
    },
    {
      src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/mun-pics/DSC08400.jpg",
      alt: "DelTech MUN Event 2",
    },
    {
      src: "https://mun-website-images.s3.ap-south-1.amazonaws.com/mun-pics/DSC08044.jpg",
      alt: "DelTech MUN Event 3",
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        {/* Add your real image path here */}
        <div className="absolute inset-0">
          <Image
            src="/api/placeholder/1920/600"
            alt="DelTech MUN Team"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            About DelTech MUN & DebSoc
          </h1>
          <p className="text-xl text-white/90 max-w-xl mx-auto">
            Delhi's Oldest and Most Prestigious Debating Society
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-2">
                Our Legacy
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                Founded in 2011, DelTech MUN and DebSoc stands as the oldest and
                most prestigious debating society at DTU. For over a decade, we
                have fostered critical thinking, public speaking, and diplomatic
                skills among students. Our flagship event, DelTech MUN, has been
                organized annually since our inception, bringing together
                brilliant minds from across the country to engage in meaningful
                discourse on global issues.
              </p>
            </div>

            {/* Image Gallery */}
            <Carousel className="w-full mt-8 mb-12">
              <CarouselContent>
                {[1, 2, 3].map((idx) => (
                  <CarouselItem key={idx}>
                    <div className="h-64 md:h-80 relative rounded-lg overflow-hidden">
                      <Image
                        src={`/api/placeholder/800/450`}
                        alt={`DelTech MUN Event ${idx}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>

            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-2">
                What We Do
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Flagship Event</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Our annual DelTech MUN brings together delegates from
                      across the country to debate pressing global issues in a
                      simulated UN environment.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Weekly Charchas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Regular informal debates on contemporary topics that help
                      members practice their argumentation and public speaking
                      skills.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>ABC Vivaads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Structured debate sessions that follow specific formats to
                      develop versatility in debating styles among our members.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle>Training Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Personalized coaching for members to enhance their
                      debating, research, and diplomatic skills through expert
                      guidance.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader className="bg-slate-800 text-white rounded-t-lg">
                <CardTitle>DelTech Minds</CardTitle>
                <CardDescription className="text-slate-200">
                  Our Blogging Platform
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-slate-700">
                  DelTech Minds is our official blogging and content channel
                  where members express their opinions on various topics, share
                  analyses of current affairs, and showcase their writing
                  skills. The platform serves as an avenue for intellectual
                  expression beyond formal debates.
                </p>
                <div className="mt-6">
                  <a
                    href="https://medium.com/@deltech.mun"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors">
                      Visit DelTech Minds
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-slate-800 text-white rounded-t-lg">
                <CardTitle>Alumni Network</CardTitle>
                <CardDescription className="text-slate-200">
                  Our Extended Family
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-slate-700">
                  We maintain a robust network of alumni who are making great
                  strides in various domains including technology, consulting,
                  finance, core engineering, and public policy. Our alumni
                  regularly engage with current members through mentorship
                  programs and guest sessions.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-slate-800 text-white rounded-t-lg">
                <CardTitle>Mentor-Mentee System</CardTitle>
                <CardDescription className="text-slate-200">
                  Guiding the Next Generation
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-slate-700">
                  Our mentor-mentee system pairs experienced members with
                  newcomers, providing personalized guidance and support. This
                  system ensures knowledge transfer and helps new members
                  quickly develop the skills needed to excel in debates and
                  MUNs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-slate-800 text-white py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Our Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm">
              <span className="text-5xl font-bold text-amber-400 block mb-4">
                10+
              </span>
              <h3 className="text-xl font-semibold mb-2">
                Years of Excellence
              </h3>
              <p>A decade of fostering debate culture at DTU</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm">
              <span className="text-5xl font-bold text-amber-400 block mb-4">
                50+
              </span>
              <h3 className="text-xl font-semibold mb-2">Accolades</h3>
              <p>Recognitions won across Delhi-NCR circuit</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm">
              <span className="text-5xl font-bold text-amber-400 block mb-4">
                200+
              </span>
              <h3 className="text-xl font-semibold mb-2">Alumni</h3>
              <p>Successful graduates in diverse fields</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
          Our Programs
        </h2>
        <Tabs defaultValue="mun" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mun">MUN Conferences</TabsTrigger>
            <TabsTrigger value="debate">Debate Sessions</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>
          <TabsContent value="mun" className="p-6 border rounded-md mt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Model United Nations</h3>
              <p>
                Our flagship event DelTech MUN has been held annually since
                2011, bringing together delegates from prestigious institutions
                across India. We also organize intra-college MUNs to prepare our
                members for national and international conferences.
              </p>
              <div className="mt-8 aspect-video relative rounded-lg overflow-hidden">
                <Image
                  src="/api/placeholder/1200/675"
                  alt="DelTech MUN Conference"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="debate" className="p-6 border rounded-md mt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Debate Sessions</h3>
              <p>
                Our weekly charchas and ABC Vivaads provide a platform for
                members to engage in discussions on contemporary issues. These
                sessions help develop critical thinking, public speaking, and
                argumentation skills in an informal setting.
              </p>
              <div className="mt-8 aspect-video relative rounded-lg overflow-hidden">
                <Image
                  src="/api/placeholder/1200/675"
                  alt="Debate Session"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="training" className="p-6 border rounded-md mt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Training & Development</h3>
              <p>
                We conduct personalized training sessions for our members
                covering research methodologies, position paper writing,
                committee strategies, and public speaking. Our open conversation
                channels allow members to seek guidance from seniors and alumni
                at any time.
              </p>
              <div className="mt-8 aspect-video relative rounded-lg overflow-hidden">
                <Image
                  src="/api/placeholder/1200/675"
                  alt="Training Session"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Join Us Call to Action */}
      <section className="bg-gradient-to-r from-slate-700 to-slate-900 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Join DelTech MUN & DebSoc</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Become part of Delhi's oldest and most prestigious debating society.
            Develop your speaking skills, expand your network, and represent DTU
            at national competitions.
          </p>
          <button className="bg-amber-500 text-slate-900 px-8 py-3 rounded-lg font-bold hover:bg-amber-400 transition-colors">
            Apply Now
          </button>
        </div>
      </section>
    </div>
  );
}
