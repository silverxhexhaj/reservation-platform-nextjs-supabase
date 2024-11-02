'use client'

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const teamMembers = [
  {
    name: 'John Doe',
    role: 'Founder & CEO',
    image: '/images/john-doe.jpg',
  },
  {
    name: 'Jane Smith',
    role: 'CTO',
    image: '/images/jane-smith.jpg',
  },
  {
    name: 'Mike Johnson',
    role: 'Lead Developer',
    image: '/images/mike-johnson.jpg',
  },
]

export default function WhoWeAre() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Who We Are?</h1>
      
      <div className="max-w-3xl mx-auto mb-12">
        <p className="text-lg text-gray-700 mb-4">
          We are a passionate team of innovators dedicated to revolutionizing the way people interact with technology. Our mission is to create intuitive, powerful, and accessible solutions that empower users to achieve their goals effortlessly.
        </p>
        <p className="text-lg text-gray-700">
          With a combined experience of over 30 years in software development, user experience design, and artificial intelligence, we bring a wealth of knowledge and expertise to every project we undertake.
        </p>
      </div>

      <h2 className="text-3xl font-semibold text-center mb-8">Our Team</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <Card key={member.name} className="flex flex-col items-center">
            <CardHeader>
              <Image
                src={member.image}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-full"
              />
            </CardHeader>
            <CardContent className="text-center">
              <CardTitle className="mb-2">{member.name}</CardTitle>
              <p className="text-gray-600">{member.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc list-inside text-left max-w-2xl mx-auto">
          <li className="mb-2">Innovation: We constantly push the boundaries of what's possible.</li>
          <li className="mb-2">User-Centric Design: Our users are at the heart of everything we do.</li>
          <li className="mb-2">Collaboration: We believe in the power of teamwork and open communication.</li>
          <li className="mb-2">Integrity: We uphold the highest standards of honesty and ethical behavior.</li>
          <li>Continuous Learning: We're always striving to improve and grow.</li>
        </ul>
      </div>
    </div>
  )
}