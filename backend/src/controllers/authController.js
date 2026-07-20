import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import sendEmail from '../utils/sendEmail.js';


export const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name }
    });

    console.log("Attempting to send email to:", user.email); 

    sendEmail({
      email: user.email,
      subject: 'Welcome to Our Store!',
      message: 'Thanks for signing up!'
    })
    .then(() => console.log("Email function  successfully")) 
    .catch(err => console.error("Email function failed with error:", err)); 

    res.status(201).json({ message: "User created successfully", userId: user.id });

  } catch (error) {
    console.error("Registration error:", error); 
    res.status(400).json({ error: "Email already exists or invalid data" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

const token = jwt.sign(
  { 
    userId: user.id, 
    iat: Math.floor(Date.now() / 1000) 
  }, 
  process.env.JWT_SECRET, 
  { expiresIn: '1h' }
);


res.json({ token, user: { id: user.id, name: user.name, isAdmin: user.isAdmin } });
};



export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, isAdmin: true } 
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: { name, email }
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};