'use client'

import React, { useEffect, useState } from 'react'
import { ArrowRight, Play, Clock, Users, Star, BookOpen, Globe, Award, TrendingUp } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface CourseWithInstructors {
  id: string
  title_ua: string
  title_pl: string
  title_en: string
  title_ru?: string
  description_ua?: string
  description_pl?: string
  description_en?: string
  description_ru?: string
  language: string
  level: string
  price: number
  duration_weeks: number
  is_active: boolean
  instructors?: Array<{
    id: string
    name: string
    photo_url?: string
  }>
}

interface HomePageProps {
  onPageChange: (page: string) => void
}

export function HomePage({ onPageChange }: HomePageProps) {
  const { t, language } = useLanguage()
  const [courses, setCourses] = useState<CourseWithInstructors[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true)
        const response = await fetch('/api/courses')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (data.error) {
          throw new Error(data.error)
        }
        
        setCourses(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Error fetching courses:', error)
        // Set empty array on error to prevent UI issues
        setCourses([])
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  const getLocalizedTitle = (course: CourseWithInstructors) => {
    switch (language) {
      case 'pl': return course.title_pl
      case 'en': return course.title_en
      case 'ru': return course.title_ru || course.title_en
      default: return course.title_ua
    }
  }

  const getLocalizedDescription = (course: CourseWithInstructors) => {
    switch (language) {
      case 'pl': return course.description_pl
      case 'en': return course.description_en
      case 'ru': return course.description_ru || course.description_en
      default: return course.description_ua
    }
  }

  return (
    <main>
      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button 
                onClick={() => scrollToSection('courses')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 flex items-center space-x-2 shadow-lg"
              >
                <span>{t('hero.cta')}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button 
                onClick={() => onPageChange('about')}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>{t('hero.learn_more')}</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">25,000+</div>
                <div className="text-gray-600">{t('hero.students')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">150+</div>
                <div className="text-gray-600">{t('hero.courses')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">12</div>
                <div className="text-gray-600">{t('hero.languages')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">98%</div>
                <div className="text-gray-600">{t('hero.success_rate')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose LinguaSchool?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with our comprehensive approach to language learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Instructors</h3>
              <p className="text-gray-600">Learn from certified native speakers with years of teaching experience</p>
            </div>

            <div className="text-center p-8 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Interactive Learning</h3>
              <p className="text-gray-600">Engaging lessons with multimedia content and real-time feedback</p>
            </div>

            <div className="text-center p-8 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Proven Results</h3>
              <p className="text-gray-600">98% of our students achieve their language goals within 6 months</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our wide selection of language courses designed for all levels
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-t-xl"></div>
                  <div className="p-6 border border-gray-200 rounded-b-xl bg-white">
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                      <div className="h-10 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.slice(0, 6).map((course) => (
                <div key={course.id} className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 h-48 flex items-center justify-center">
                      <div className="text-white text-center p-6">
                        <h3 className="text-xl font-bold mb-2">{course.language.toUpperCase()}</h3>
                        <p className="text-blue-100 capitalize">{course.level}</p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur text-white px-3 py-1 rounded-full text-sm">
                      {course.duration_weeks} weeks
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {getLocalizedTitle(course)}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {getLocalizedDescription(course)}
                    </p>
                    
                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration_weeks} weeks</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.instructors?.length || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        <span>5.0</span>
                      </div>
                    </div>

                    {course.instructors && course.instructors.length > 0 && (
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex -space-x-2">
                          {course.instructors.slice(0, 3).map((instructor, index) => (
                            <div key={instructor.id} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
                              {instructor.photo_url ? (
                                <img 
                                  src={instructor.photo_url} 
                                  alt={instructor.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                                  {instructor.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {course.instructors[0]?.name}
                          {course.instructors.length > 1 && ` +${course.instructors.length - 1}`}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-blue-600">
                        ${course.price}
                      </div>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 font-medium">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {courses.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No courses available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Language Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students and achieve your language goals with our expert instructors.
          </p>
          <button 
            onClick={() => onPageChange('contact')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </main>
  )
}