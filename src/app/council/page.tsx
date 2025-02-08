"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const councilMembers = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "President",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Emily is a senior majoring in International Relations with a focus on sustainable development.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Vice President",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Michael is pursuing a double major in Political Science and Economics, with a keen interest in global trade policies.",
  },
  // Add more council members here
]

export default function CouncilPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        MUN Society Council
      </motion.h1>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {councilMembers.map((member) => (
          <motion.div
            key={member.id}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Card className="bg-white bg-opacity-10 backdrop-blur-md border-none text-white overflow-hidden">
              <CardHeader>
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto"
                  />
                </motion.div>
                <CardTitle className="text-center mt-4">{member.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-blue-300 mb-2">{member.role}</p>
                <p className="text-center">{member.bio}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

