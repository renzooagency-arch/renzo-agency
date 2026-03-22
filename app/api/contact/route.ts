import { NextResponse } from 'next/server';
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// 1. Pull the hidden keys from your .env.local file
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// 2. Initialize Firebase securely on the backend (prevents duplicate initializations)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export async function POST(request: Request) {
  try {
    // 3. Read the data sent from your website's form
    const body = await request.json();
    const { name, email, project_type, message, honeypot } = body;

    // 4. THE ANTI-BOT HONEYPOT TRAP
    // If a bot fills out our invisible field, we pretend it worked but delete the data.
    if (honeypot) {
      console.warn("Spam bot intercepted and blocked.");
      return NextResponse.json({ success: true });
    }

    // 5. Securely push the real human data to your Firebase CRM
    await addDoc(collection(db, "leads"), {
      name: name || "",
      email: email || "",
      projectType: project_type || "",
      message: message || "",
      status: "New Lead",
      createdAt: serverTimestamp(),
    });

    // 6. Tell the website to show the green checkmark
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("Firebase Backend Error:", error);
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  }
}