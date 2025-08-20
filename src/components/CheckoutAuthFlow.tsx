"use client"

import { useState, useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CheckoutAuthFlowProps {
  checkoutSessionId: string
}

export default function CheckoutAuthFlow({ checkoutSessionId }: CheckoutAuthFlowProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  
  const { data: session, status } = useSession()
  const router = useRouter()

  // Function to link purchases to user's account
  const linkPurchasesToUser = async () => {
    try {
      const response = await fetch('/api/user/link-purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checkoutSessionId
        })
      })

      const data = await response.json()

      if (response.ok) {
        console.log(`Linked ${data.linkedCount} purchases to user account`)
        return data.linkedCount
      } else {
        console.error('Failed to link purchases to user account:', data.error)
        return 0
      }
    } catch (error) {
      console.error('Error linking purchases:', error)
      return 0
    }
  }

  useEffect(() => {
    if (session?.user) {
      // Link all purchases (including current checkout) to user's account
      linkPurchasesToUser().then((linkedCount) => {
        setIsSuccess(true)
        
        if (linkedCount > 0) {
          setMessage(`Welcome! Your purchase has been confirmed and ${linkedCount > 1 ? `${linkedCount} purchases have` : '1 purchase has'} been linked to your account.`)
        } else {
          setMessage("Welcome! Your account is ready.")
        }
        
        // Redirect to dashboard after a delay
        setTimeout(() => {
          router.push("/dashboard")
        }, 2500)
      })
    }
  }, [session])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid credentials")
      } else {
        // Purchases will be linked via useEffect when session updates
        setMessage("Successfully signed in! Linking your purchases...")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      if (response.ok) {
        // Auto sign in after registration
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        })
        
        if (!result?.error) {
          // Purchases will be linked via useEffect when session updates
          setMessage("Account created successfully! Linking your purchases...")
        }
      } else {
        const data = await response.json()
        setError(data.error || "An error occurred")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-sky" />
        <div className="absolute inset-0 bg-gradient-watercolor opacity-50" />
        
        {/* Floating Background Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-sky-300/30 rounded-full animate-float" />
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-sky-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/50 rounded-full animate-watercolor" />
        
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <div className="text-darker">Loading...</div>
        </div>
      </div>
    )
  }

  if (isSuccess || session?.user) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-sky" />
        <div className="absolute inset-0 bg-gradient-watercolor opacity-50" />
        
        {/* Floating Background Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-sky-300/30 rounded-full animate-float" />
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-sky-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/50 rounded-full animate-watercolor" />
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-sky-400/20 rounded-full animate-float" style={{ animationDelay: '4s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md w-full mx-auto backdrop-blur-watercolor rounded-2xl shadow-floating p-8 animate-fade-in">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gradient-hero mb-6 shadow-soft">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-primary text-display">
                Payment Confirmed!
              </h1>
              <p className="mb-6 text-lg text-darker">
                {message || "Your purchase has been confirmed. You can now access your event."}
              </p>
              
              {session?.user && (
                <div className="mb-8 p-6 bg-white/60 rounded-xl shadow-watercolor border border-sky-200">
                  <p className="text-sm text-muted-foreground mb-2">Welcome back!</p>
                  <p className="font-semibold text-darker text-lg">{session.user.email}</p>
                  {session.user.name && (
                    <p className="text-muted-foreground">{session.user.name}</p>
                  )}
                </div>
              )}

              {/* Event Details Card */}
              <div className="mb-8 p-6 bg-gradient-to-r from-sky-50 to-sky-100 rounded-xl shadow-soft border border-sky-200">
                <h3 className="font-bold text-primary mb-4 text-lg text-display">Event Details</h3>
                <div className="space-y-2 text-left">
                  <p className="text-sm text-darker">
                    <strong className="text-sky-600">Order ID:</strong> {checkoutSessionId.split('_').pop()}
                  </p>
                  <p className="text-sm text-darker">
                    <strong className="text-sky-600">Event:</strong> Your Event Booking
                  </p>
                  <p className="text-sm text-darker">
                    <strong className="text-sky-600">Status:</strong> 
                    <span className="text-primary font-medium ml-1">✓ Confirmed</span>
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={() => router.push("/dashboard")} 
                  variant="hero"
                  size="lg"
                  className="w-full text-lg py-6"
                >
                  Go to Dashboard
                </Button>
                <Button 
                  onClick={() => router.push("/")} 
                  variant="cloud"
                  size="lg"
                  className="w-full text-lg py-6"
                >
                  Return to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-sky" />
      <div className="absolute inset-0 bg-gradient-watercolor opacity-50" />
      
      {/* Floating Background Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-sky-300/30 rounded-full animate-float" />
      <div className="absolute bottom-32 right-20 w-24 h-24 bg-sky-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/50 rounded-full animate-watercolor" />
      <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-sky-400/20 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <Card className="w-full max-w-md mx-auto backdrop-blur-watercolor border-sky-200 shadow-floating animate-fade-in">
          <CardHeader>
            <div className="text-center mb-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gradient-hero mb-3 shadow-soft">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-primary mb-1 text-display">Payment Successful!</h2>
              <p className="text-sm text-muted-foreground">Complete your registration to access your event</p>
            </div>
            
            <CardTitle className="text-darker text-center text-display">
              {isRegistering ? "Create Account" : "Sign In"}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-center">
              {isRegistering 
                ? "Create an account to access your purchase" 
                : "Sign in to confirm your purchase and access your event"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={isRegistering ? handleSignUp : handleSignIn} className="space-y-4">
              {isRegistering && (
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-darker">
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white/80 border-sky-200 text-darker placeholder-muted-foreground focus-watercolor"
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-darker">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/80 border-sky-200 text-darker placeholder-muted-foreground focus-watercolor"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-darker">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder={isRegistering ? "Enter your password (min 6 characters)" : "Enter your password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/80 border-sky-200 text-darker placeholder-muted-foreground focus-watercolor"
                  required
                  minLength={isRegistering ? 6 : undefined}
                />
              </div>
              
              {isRegistering && (
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-darker">
                    Confirm Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-white/80 border-sky-200 text-darker placeholder-muted-foreground focus-watercolor"
                    required
                  />
                </div>
              )}
              
              {error && (
                <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-lg border border-destructive/20">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full text-lg py-6" 
                disabled={loading}
              >
                {loading 
                  ? (isRegistering ? "Creating account..." : "Signing in...") 
                  : (isRegistering ? "Create Account & Access Event" : "Sign In & Access Event")
                }
              </Button>
            </form>
            
            <div className="mt-6 text-center text-base">
              {isRegistering ? (
                <>
                  <span className="text-darker">Already have an account?</span>{" "}
                  <button 
                    onClick={() => setIsRegistering(false)}
                    className="text-sky-600 hover:text-sky-700 font-semibold hover:underline transition-colors duration-200"
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  <span className="text-darker">Don't have an account?</span>{" "}
                  <button 
                    onClick={() => setIsRegistering(true)}
                    className="text-sky-600 hover:text-sky-700 font-semibold hover:underline transition-colors duration-200"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
