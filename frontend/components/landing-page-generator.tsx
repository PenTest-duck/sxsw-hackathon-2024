'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function LandingPageGeneratorComponent() {
  const [productUrl, setProductUrl] = useState('')
  const [customerUrl, setCustomerUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Generating landing page for:', { productUrl, customerUrl })
  }

  return (
    <div className="min-h-screen bg-[#1e0a3c] text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-transparent bg-clip-text">
          AI Landing Page Generator
        </h1>
        <p className="text-xl md:text-2xl text-center mb-8 text-gray-300">
          Create a personalized landing page for your product in seconds.
        </p>

        <div className="bg-[#2d1854] rounded-lg p-6 mb-8">
          <div className="chat-bubble mb-4 bg-[#3b2064] p-4 rounded-lg inline-block">
            Hi there!
          </div>
          <div className="chat-bubble mb-4 bg-[#3b2064] p-4 rounded-lg inline-block">
            Please enter your product URL and target customer URL to generate a personalized landing page.
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="url"
              placeholder="Enter your product URL"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              required
              className="w-full bg-[#4c2a80] border-[#6b3bbd] text-white placeholder-gray-400"
            />
            <Input
              type="url"
              placeholder="Enter your target customer URL"
              value={customerUrl}
              onChange={(e) => setCustomerUrl(e.target.value)}
              required
              className="w-full bg-[#4c2a80] border-[#6b3bbd] text-white placeholder-gray-400"
            />
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              Generate Landing Page
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-400">
          Powered by AI to create stunning, personalized landing pages for your products.
        </p>
      </div>
    </div>
  )
}