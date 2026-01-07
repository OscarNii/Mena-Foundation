/*
  # MenaCharityFoundation Database Schema

  1. New Tables
    - `donations`
      - `id` (uuid, primary key)
      - `donor_name` (text)
      - `donor_email` (text)
      - `amount` (numeric)
      - `message` (text, optional)
      - `created_at` (timestamptz)
    
    - `gallery_images`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated insert operations
*/

CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name text NOT NULL,
  donor_email text NOT NULL,
  amount numeric NOT NULL CHECK (amount > 0),
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view donations"
  ON donations FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create donations"
  ON donations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view gallery images"
  ON gallery_images FOR SELECT
  USING (true);