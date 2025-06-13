import { NextResponse } from 'next/server';
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      firstname,
      lastname,
      company,
      address,
      city,
      state,
      country,
      zip,
      phone,
      about
    } = body;

    // Check if user already exists
    const check = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (check.rows.length > 0) {
      return NextResponse.json(
        { error: "User email already exists." },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create table 
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100),
        company VARCHAR(100),
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        country VARCHAR(100),
        zip VARCHAR(20),
        phone VARCHAR(20),
        about TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert user
    await pool.query(
      `INSERT INTO users
        (email, password, first_name, last_name, company, address, city, state, country, zip, phone, about)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [
        email,
        hashedPassword,
        firstname,
        lastname,
        company,
        address,
        city,
        state,
        country,
        zip,
        phone,
        about,
      ]
    );

    return NextResponse.json({ success: true, message: "User registered successfully." });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "User Registration Failed!" }, { status: 500 });
  }
}
