"use client";
import React, { memo } from "react";
import ProfileCard from "../../components/ProfileCard";
import leads from "../../seeds/leads";
import core from "../../seeds/core";
import fac from "../../seeds/facultyCoordinator";
import ParticlesComponent from "@/components/Particles";

interface Profile {
  name: string;
  designation?: string;
  image: string;
  socialHandles?: Record<string, string>;
  department?: string;
}

const MemoizedProfileCard = memo(ProfileCard);

interface SectionProps {
  title: string;
  data: Profile[];
  useCustomCard: boolean;
}

const TriangleLayout: React.FC<{ data: Profile[] }> = ({ data }) => {
  // Find specific members by name
  const pranav = data.find(p => p.name.includes("Prannavakhanth"));
  const derrick = data.find(p => p.name.includes("Derrick"));
  const mithil = data.find(p => p.name.includes("Mithil"));
  const others = data.filter(p => 
    !p.name.includes("Prannavakhanth") && 
    !p.name.includes("Derrick") && 
    !p.name.includes("Mithil")
  );

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Top Row - Pranav */}
      <div className="flex justify-center">
        {pranav && (
          <MemoizedProfileCard
            name={pranav.name}
            designation={pranav.designation}
            image={pranav.image}
            socialHandles={pranav.socialHandles}
          />
        )}
      </div>

      {/* Second Row - Derrick and Mithil */}
      <div className="flex justify-center space-x-16">
        {derrick && (
          <MemoizedProfileCard
            name={derrick.name}
            designation={derrick.designation}
            image={derrick.image}
            socialHandles={derrick.socialHandles}
          />
        )}
        {mithil && (
          <MemoizedProfileCard
            name={mithil.name}
            designation={mithil.designation}
            image={mithil.image}
            socialHandles={mithil.socialHandles}
          />
        )}
      </div>

      {/* Bottom Row - All Others */}
      <div className="flex justify-center space-x-8">
        {others.map((item, index) => (
          <MemoizedProfileCard
            key={index}
            name={item.name}
            designation={item.designation}
            image={item.image}
            socialHandles={item.socialHandles}
          />
        ))}
      </div>
    </div>
  );
};

const groupByDepartment = (data: Profile[]): Record<string, Profile[]> => {
  return data.reduce((acc, profile) => {
    const department = profile.department || "General";
    if (!acc[department]) {
      acc[department] = [];
    }
    acc[department].push(profile);
    return acc;
  }, {} as Record<string, Profile[]>);
};

const Section: React.FC<SectionProps> = ({ title, data, useCustomCard }) => {
  const groupedData = groupByDepartment(data);

  return (
    <section className="mb-12">
      <ParticlesComponent id="particles-background" />
      <div className="container mx-auto px-6 py-8 h-auto w-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">{title}</h1>
        {title === "Core" ? (
          <TriangleLayout data={data} />
        ) : (
          Object.entries(groupedData).map(([department, profiles]) => (
            <div key={department} className="mb-8 text-center">
              {title !== "Core" && department !== "General" && (
                <h2 className="text-3xl font-semibold text-gray-300 mb-6">{department}</h2>
              )}
              <div className="flex justify-center flex-wrap gap-8">
                {profiles.map((item, index) =>
                  useCustomCard ? (
                    <div
                      key={index}
                      className="max-w-md w-full rounded-lg border border-white bg-gradient-to-br from-gray-900 to-black shadow-lg p-6 text-center text-white transform transition-all duration-300 hover:scale-105 opacity-75 transition duration-1000 group-hover:duration-200"
                    >
                      <div className="mb-6 flex justify-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-32 w-32 rounded-full border-4 border-gray-700 object-cover transition-all duration-300 ease-in-out transform hover:scale-110"
                        />
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
                      <p className="text-sm italic text-gray-300 mb-4">Faculty Coordinator</p>
                    </div>
                  ) : (
                    <MemoizedProfileCard
                      key={index}
                      name={item.name}
                      designation={item.designation}
                      image={item.image}
                      socialHandles={item.socialHandles}
                    />
                  )
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

const Page: React.FC = () => {
  return (
    <div className="min-h-screen text-white">
      <main className="container mx-auto px-4">
        <Section title="Core" data={core} useCustomCard={false} />
        <Section title="Faculty Coordinator" data={fac} useCustomCard={true} />
        <Section title="Leads" data={leads} useCustomCard={false} />
      </main>
    </div>
  );
};

export default Page;
