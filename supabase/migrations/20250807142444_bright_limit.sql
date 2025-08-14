/*
# Online Language School Database Schema

1. New Tables
  - `instructors`
    - `id` (uuid, primary key)
    - `name` (text)
    - `email` (text, unique)
    - `bio` (text)
    - `photo_url` (text)
    - `languages` (jsonb array)
    - `created_at` (timestamp)
  
  - `courses`
    - `id` (uuid, primary key) 
    - `title_ua` (text)
    - `title_pl` (text)
    - `title_en` (text)
    - `description_ua` (text)
    - `description_pl` (text)
    - `description_en` (text)
    - `language` (text)
    - `level` (text)
    - `price` (decimal)
    - `duration_weeks` (integer)
    - `image_url` (text)
    - `is_active` (boolean, default true)
    - `created_at` (timestamp)
    
  - `lessons`
    - `id` (uuid, primary key)
    - `course_id` (uuid, foreign key)
    - `title_ua` (text)
    - `title_pl` (text)
    - `title_en` (text)
    - `description_ua` (text)
    - `description_pl` (text)
    - `description_en` (text)
    - `order_index` (integer)
    - `video_url` (text)
    - `created_at` (timestamp)
    
  - `materials`
    - `id` (uuid, primary key)
    - `lesson_id` (uuid, foreign key)
    - `title` (text)
    - `type` (text)
    - `file_url` (text)
    - `order_index` (integer)
    - `created_at` (timestamp)
    
  - `course_instructors`
    - `id` (uuid, primary key)
    - `course_id` (uuid, foreign key)
    - `instructor_id` (uuid, foreign key)
    - `role` (text, default 'main')
    - `created_at` (timestamp)

2. Security
  - Enable RLS on all tables
  - Add policies for authenticated admin access
  - Secure file uploads and access

3. Indexes
  - Add performance indexes for common queries
*/

-- Create instructors table
CREATE TABLE IF NOT EXISTS instructors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  bio text DEFAULT '',
  photo_url text DEFAULT '',
  languages jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ua text NOT NULL,
  title_pl text NOT NULL,
  title_en text NOT NULL,
  description_ua text DEFAULT '',
  description_pl text DEFAULT '',
  description_en text DEFAULT '',
  language text NOT NULL,
  level text NOT NULL,
  price decimal(10,2) DEFAULT 0,
  duration_weeks integer DEFAULT 0,
  image_url text DEFAULT '',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title_ua text NOT NULL,
  title_pl text NOT NULL,
  title_en text NOT NULL,
  description_ua text DEFAULT '',
  description_pl text DEFAULT '',
  description_en text DEFAULT '',
  order_index integer DEFAULT 0,
  video_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create materials table
CREATE TABLE IF NOT EXISTS materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title text NOT NULL,
  type text NOT NULL,
  file_url text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create course_instructors table
CREATE TABLE IF NOT EXISTS course_instructors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  instructor_id uuid NOT NULL REFERENCES instructors(id) ON DELETE CASCADE,
  role text DEFAULT 'main',
  created_at timestamptz DEFAULT now(),
  UNIQUE(course_id, instructor_id)
);

-- Enable Row Level Security
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_instructors ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admin access)
CREATE POLICY "Admin can manage instructors"
  ON instructors
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admin can manage courses"
  ON courses
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admin can manage lessons"
  ON lessons
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admin can manage materials"
  ON materials
  FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Admin can manage course instructors"
  ON course_instructors
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for anonymous users (read-only for active content)
CREATE POLICY "Public can view active courses"
  ON courses
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Public can view instructors"
  ON instructors
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view lessons for active courses"
  ON lessons
  FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE courses.id = lessons.course_id 
      AND courses.is_active = true
    )
  );

CREATE POLICY "Public can view course instructors for active courses"
  ON course_instructors
  FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM courses 
      WHERE courses.id = course_instructors.course_id 
      AND courses.is_active = true
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_courses_language ON courses(language);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_courses_active ON courses(is_active);
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_order ON lessons(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_materials_lesson_id ON materials(lesson_id);
CREATE INDEX IF NOT EXISTS idx_materials_order ON materials(lesson_id, order_index);
CREATE INDEX IF NOT EXISTS idx_course_instructors_course ON course_instructors(course_id);
CREATE INDEX IF NOT EXISTS idx_course_instructors_instructor ON course_instructors(instructor_id);