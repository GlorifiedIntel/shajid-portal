import { dbConnect } from '../../../../lib/mongodb';
import mongoose from 'mongoose';

export async function POST(req) {
  try {
    const { userId, data } = await req.json();

    if (!userId || !data) {
      return new Response(
        JSON.stringify({ error: 'Missing userId or data in request body' }),
        { status: 400 }
      );
    }

    await dbConnect();
    const db = mongoose.connection;
    const collection = db.collection('applications');

    // ✅ Ensure userId is treated as a string, then converted safely
    const objectUserId = new mongoose.Types.ObjectId(String(userId));

    const filter = { userId: objectUserId };
    const updateDoc = {
      $set: {
        step3: data,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
        userId: objectUserId,
      },
    };
    const options = { upsert: true };

    const result = await collection.updateOne(filter, updateDoc, options);

    return new Response(
      JSON.stringify({ message: 'Step 3 data saved successfully', result }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in step-3 API:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
