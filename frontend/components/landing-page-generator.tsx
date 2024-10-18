'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function LandingPageGeneratorComponent() {
  const [productUrl, setProductUrl] = useState('')
  const [customerUrl, setCustomerUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const submitData = { 
      "product_website": productUrl, 
      "customer_website": customerUrl,
    };

    fetch('http://127.0.0.1:5000/generate_landing_page',{
      method: 'POST',
      body: JSON.stringify(submitData),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => 
          res.json().then(data => ({
              data: data,
              ok: res.ok,
          })
      ).then(res => {
        if (res.ok) {
          // If the API call is successful, redirect to the return page
          router.push(`http://127.0.0.1:8000/landing_pages/${res.data.id}`)
        } else {
          console.error("Oops! Something is wrong.")
        }
      }))
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="min-h-screen bg-[#1e0a3c] text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-transparent bg-clip-text">
          AI Landing Page Generator
        </h1>
        <p className="text-xl md:text-2xl text-center mb-8 text-gray-300">
          Create a tailored landing page for your product in seconds.
        </p>

        <div className="bg-[#2d1854] rounded-lg p-6 mb-8">
          <div className="chat-bubble mb-4 bg-[#3b2064] p-4 rounded-lg inline-block">
            Hi there!
          </div>
          <div className="chat-bubble mb-4 bg-[#3b2064] p-4 rounded-lg inline-block">
            Please enter your product URL and target customer URL to generate a tailored landing page.
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
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Landing Page'
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-400">
          Powered by AI to create stunning, tailored landing pages for your products.
        </p>
      </div>
    </div>
  )
}