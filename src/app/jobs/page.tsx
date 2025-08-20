"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, FileText, Users, DollarSign, Video, PenTool, UserCheck, BookOpen, FlaskConical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const jobs = [
  {
    id: 1,
    title: "Customer Service Rep for English-Speaking Clients",
    postedDays: 3,
    hourlyRate: 18,
    jobType: "Full-time",
    visaSupport: false,
    icon: FileText,
  },
  {
    id: 2,
    title: "Retail Sales Associate in US-Only Stores",
    postedDays: 5,
    hourlyRate: 16,
    jobType: "Contract",
    visaSupport: false,
    icon: FileText,
  },
  {
    id: 3,
    title: "Office Admin Assistant Requiring Fluent English",
    postedDays: 7,
    hourlyRate: 22,
    jobType: "Full-time",
    visaSupport: true,
    icon: UserCheck,
  },
  {
    id: 4,
    title: "Warehouse Coordinator with Basic English Skills",
    postedDays: 2,
    hourlyRate: 20,
    jobType: "Contract",
    visaSupport: false,
    icon: FileText,
  },
  {
    id: 5,
    title: "Front Desk Clerk for Native English Speakers",
    postedDays: 4,
    hourlyRate: 17,
    jobType: "Full-time",
    visaSupport: false,
    icon: FileText,
  },
  {
    id: 6,
    title: "Data Entry Specialist for US-Based Firms",
    postedDays: 6,
    hourlyRate: 19,
    jobType: "Contract",
    visaSupport: true,
    icon: FileText,
  },
  {
    id: 7,
    title: "Software Engineer with University Computer Degree",
    postedDays: 8,
    hourlyRate: 65,
    jobType: "Full-time",
    visaSupport: true,
    icon: FileText,
  },
  {
    id: 8,
    title: "Marketing Coordinator for Degree Holders Only",
    postedDays: 12,
    hourlyRate: 35,
    jobType: "Contract",
    visaSupport: false,
    icon: FileText,
  },
  {
    id: 9,
    title: "Human Resources Analyst Requiring Academic Background",
    postedDays: 9,
    hourlyRate: 42,
    jobType: "Full-time",
    visaSupport: true,
    icon: FileText,
  },
  {
    id: 10,
    title: "Financial Planner with Relevant University Education",
    postedDays: 15,
    hourlyRate: 55,
    jobType: "Full-time",
    visaSupport: false,
    icon: FileText,
  },
  {
    id: 11,
    title: "Copywriter for Tech Companies",
    postedDays: 4,
    hourlyRate: 45,
    jobType: "Contract",
    visaSupport: false,
    icon: PenTool,
  },
  {
    id: 12,
    title: "Video Editor for Marketing Agencies",
    postedDays: 6,
    hourlyRate: 38,
    jobType: "Full-time",
    visaSupport: true,
    icon: Video,
  },
  {
    id: 13,
    title: "Executive Assistant for C-Suite",
    postedDays: 2,
    hourlyRate: 28,
    jobType: "Full-time",
    visaSupport: false,
    icon: UserCheck,
  },
  {
    id: 14,
    title: "High School English Tutor",
    postedDays: 1,
    hourlyRate: 32,
    jobType: "Contract",
    visaSupport: false,
    icon: BookOpen,
  },
  {
    id: 15,
    title: "Chemistry Tutor for High School Students",
    postedDays: 3,
    hourlyRate: 35,
    jobType: "Contract",
    visaSupport: false,
    icon: FlaskConical,
  },
  {
    id: 16,
    title: "Content Writer for SaaS Companies",
    postedDays: 5,
    hourlyRate: 42,
    jobType: "Contract",
    visaSupport: true,
    icon: PenTool,
  },
  {
    id: 17,
    title: "Social Media Video Editor",
    postedDays: 7,
    hourlyRate: 35,
    jobType: "Contract",
    visaSupport: false,
    icon: Video,
  },
  {
    id: 18,
    title: "Virtual Administrative Assistant",
    postedDays: 4,
    hourlyRate: 24,
    jobType: "Full-time",
    visaSupport: true,
    icon: UserCheck,
  },
  {
    id: 19,
    title: "Math Tutor for High School & College",
    postedDays: 2,
    hourlyRate: 38,
    jobType: "Contract",
    visaSupport: false,
    icon: BookOpen,
  },
  {
    id: 20,
    title: "Physics Tutor for Advanced Students",
    postedDays: 6,
    hourlyRate: 40,
    jobType: "Contract",
    visaSupport: false,
    icon: FlaskConical,
  },
]

const JOBS_PER_PAGE = 10

export default function JobBoard() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("trending")
  const router = useRouter()

  const handleJobClick = () => {
    router.push('/auth/signup')
  }

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sort jobs based on selected option
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return a.postedDays - b.postedDays
      case "pay":
        return b.hourlyRate - a.hourlyRate
      case "trending":
      default:
        return 0 // Keep original order for trending
    }
  })

  const totalPages = Math.ceil(sortedJobs.length / JOBS_PER_PAGE)
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE
  const endIndex = startIndex + JOBS_PER_PAGE
  const currentJobs = sortedJobs.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Explore opportunities</h1>
          <p className="text-sm text-gray-600 mb-6">All positions are remote</p>

          {/* Search and Filters */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Type to search" 
                className="pl-10 bg-white border-gray-200 text-gray-900 placeholder-gray-500" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Button 
                variant={sortBy === "trending" ? "default" : "outline"} 
                size="sm" 
                className={sortBy === "trending" ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-gray-700 border-gray-300 bg-white hover:bg-gray-50"}
                onClick={() => setSortBy("trending")}
              >
                Trending
              </Button>
              <Button 
                variant={sortBy === "newest" ? "default" : "outline"} 
                size="sm" 
                className={sortBy === "newest" ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-gray-700 border-gray-300 bg-white hover:bg-gray-50"}
                onClick={() => setSortBy("newest")}
              >
                <Users className="w-4 h-4 mr-1" />
                Newest
              </Button>
              <Button 
                variant={sortBy === "pay" ? "default" : "outline"} 
                size="sm" 
                className={sortBy === "pay" ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-gray-700 border-gray-300 bg-white hover:bg-gray-50"}
                onClick={() => setSortBy("pay")}
              >
                <DollarSign className="w-4 h-4 mr-1" />
                Most pay
              </Button>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-3">
          {currentJobs.map((job) => {
            const IconComponent = job.icon
            return (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
                onClick={handleJobClick}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-500">Posted {job.postedDays} days ago</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Tags */}
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        ${job.hourlyRate} / hour
                      </span>
                      {job.visaSupport && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          VISA Support
                        </span>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-white"
                    >
                      {job.jobType}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(pageNum)}
              className={
                currentPage === pageNum
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "text-gray-700 border-gray-300 bg-white hover:bg-gray-50"
              }
            >
              {pageNum}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
