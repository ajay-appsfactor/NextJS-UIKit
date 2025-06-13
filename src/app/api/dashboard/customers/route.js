import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


// POST: Add Customer
export async function POST(req) {
  try {
    const data = await req.json();

    const {
      firstname,
      lastname,
      company,
      address,
      city,
      state,
      zip,
      country,
      phone,
      mobile,
      email,
      password,
      sfirstname,
      slastname,
      scompany,
      saddress,
      scity,
      sstate,
      szip,
      scountry,
      sphone,
      smobile,
      sendinvoice,
      conformance,
      terms,
      freight,
      note,
    } = data;

    // Hash password
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    // Create table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS customer (
        id SERIAL PRIMARY KEY,
        billing_firstname TEXT,
        billing_lastname TEXT,
        billing_company TEXT,
        billing_address TEXT,
        billing_city TEXT,
        billing_state TEXT,
        billing_zip TEXT,
        billing_country TEXT,
        billing_phone TEXT,
        billing_mobile TEXT,
        billing_email TEXT,
        password TEXT,
        shipping_firstname TEXT,
        shipping_lastname TEXT,
        shipping_company TEXT,
        shipping_address TEXT,
        shipping_city TEXT,
        shipping_state TEXT,
        shipping_zip TEXT,
        shipping_country TEXT,
        shipping_phone TEXT,
        shipping_mobile TEXT,
        sendinvoice TEXT,
        conformance TEXT,
        terms TEXT,
        freight TEXT,
        note TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);


    // Insert Query
    const insertQuery = `
      INSERT INTO customer (
        billing_firstname, billing_lastname, billing_company, billing_address, billing_city,
        billing_state, billing_zip, billing_country, billing_phone, billing_mobile,
        billing_email, password,
        shipping_firstname, shipping_lastname, shipping_company, shipping_address, shipping_city,
        shipping_state, shipping_zip, shipping_country, shipping_phone, shipping_mobile,
        sendinvoice, conformance, terms, freight, note
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12,
        $13, $14, $15, $16, $17,
        $18, $19, $20, $21, $22,
        $23, $24, $25, $26, $27
      ) RETURNING id
    `;

    // values
    const values = [
      firstname, lastname, company, address, city,
      state, zip, country, phone || null, mobile || null,
      email, hashedPassword,
      sfirstname || null, slastname || null, scompany || null, saddress || null, scity || null,
      sstate || null, szip || null, scountry || null, sphone || null, smobile || null,
      sendinvoice || null, conformance || null, terms || null, freight || null, note || null,
    ];

    const result = await pool.query(insertQuery, values);

    return NextResponse.json(
      { message: "Customer added", customerId: result.rows[0].id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in add customer:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


// GEt : Fetch All Data
export async function GET() {
  try {
    const result = await pool.query(`SELECT * FROM users ORDER BY created_at `);
    // console.log(result)
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}