"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FadeIn,
  TextReveal,
  StaggerChildren,
  staggerChildVariants,
} from "./text-reveal";
import { coFounders, teamMembers, type TeamMember } from "@/lib/team";

export function TeamSection() {
  return (
    <section id="team" className="py-24 md:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
              Our People
            </p>
          </FadeIn>
          <TextReveal>
            <h2 className="text-3xl md:text-5xl font-light mb-6 text-balance">
              Meet Our Team
            </h2>
          </TextReveal>
          <FadeIn delay={0.2}>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              A collective of architects, designers, and consultants united by a
              shared passion for creating extraordinary spaces.
            </p>
          </FadeIn>
        </div>

        {/* Co-Founders Section */}
        <div className="mb-32">
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-accent mb-8">
              Co-Founders
            </p>
          </FadeIn>
          {coFounders.map((cofounder, index) => (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
                {/* Co-Founder Image */}
                <motion.div
                  className="relative aspect-square overflow-hidden rounded-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1] as [
                      number,
                      number,
                      number,
                      number,
                    ],
                  }}
                >
                  <Image
                    src={cofounder.image}
                    alt={cofounder.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Co-Founder Info */}
                <StaggerChildren staggerDelay={0.15}>
                  <motion.div variants={staggerChildVariants}>
                    <h3 className="text-4xl md:text-5xl font-light mb-2">
                      {cofounder.name}
                    </h3>
                    <p className="text-lg text-accent uppercase tracking-widest mb-6">
                      {cofounder.position}
                    </p>
                  </motion.div>

                  <motion.p
                    variants={staggerChildVariants}
                    className="text-muted-foreground leading-relaxed text-lg mb-8"
                  >
                    {cofounder.bio}
                  </motion.p>

                  <motion.div
                    variants={staggerChildVariants}
                    className="pt-8 border-t border-border"
                  >
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">
                      Vision
                    </p>
                    <p className="italic text-muted-foreground leading-relaxed mt-4">
                      {cofounder.vision}
                    </p>
                  </motion.div>
                </StaggerChildren>
              </div>
          ))}
        </div>

        {/* Co-Founders Section */}
        {/* {coFounders.length > 1 && (
          <div className="mb-32">
            <FadeIn>
              <p className="text-sm uppercase tracking-widest text-accent mb-12">
                Co-Founders
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coFounders.slice(1).map((cofounder, index) => (
                <CoFounderCard key={index} cofounder={cofounder} index={index} />
              ))}
            </div>
          </div>
        )} */}

        {/* Team Members Section */}
        <div>
          <FadeIn>
            <p className="text-sm uppercase tracking-widest text-accent mb-12">
              Core Team
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface CoFounderCardProps {
  cofounder: (typeof coFounders)[0];
  index: number;
}

function CoFounderCard({ cofounder, index }: CoFounderCardProps) {
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: index * 0.1,
      }}
    >
      <motion.div
        className="relative aspect-square overflow-hidden rounded-lg mb-4"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src={cofounder.image}
          alt={cofounder.name}
          fill
          className="object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-foreground/20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-h-72 group-hover:opacity-100">
        <div className="mb-3">
          <h4 className="text-lg font-medium">{cofounder.name}</h4>
          <p className="text-sm text-accent uppercase tracking-widest mb-2">
            {cofounder.position}
          </p>
          <p className="text-sm text-muted-foreground">{cofounder.bio}</p>
        </div>
      </div>

      {/* Always visible info */}
      <div className="group-hover:hidden">
        <h4 className="text-lg font-medium">{cofounder.name}</h4>
        <p className="text-sm text-accent uppercase tracking-widest">
          {cofounder.position}
        </p>
      </div>
    </motion.div>
  );
}

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: index * 0.1,
      }}
    >
      <motion.div
        className="relative aspect-square overflow-hidden rounded-lg mb-4"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
        />
        <motion.div
          className="absolute inset-0 bg-foreground/20"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-h-72 group-hover:opacity-100">
        <div className="mb-3">
          <h4 className="text-lg font-medium">{member.name}</h4>
          <p className="text-sm text-accent uppercase tracking-widest mb-2">
            {member.position}
          </p>
          <p className="text-xs text-muted-foreground">
            {member.experience} experience
          </p>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {member.bio}
        </p>
      </div>

      {/* Always visible info */}
      <div className="group-hover:hidden">
        <h4 className="text-lg font-medium">{member.name}</h4>
        <p className="text-sm text-accent uppercase tracking-widest mb-2">
          {member.position}
        </p>
        <p className="text-xs text-muted-foreground">
          {member.experience} experience
        </p>
      </div>
    </motion.div>
  );
}
