import 'server-only';

import { genSaltSync, hashSync } from 'bcrypt-ts';
import { and, asc, desc, eq, gt, gte, sql } from 'drizzle-orm';

import { db } from './index';
import {
  users,
  conversations,
  messages,
  businesses,
  businessAccesses,
  ragChunks,
  ragQueries
} from './schema';

export async function getUser(email: string) {
  try {
    return await db.select().from(users).where(eq(users.email, email));
  } catch (error) {
    console.error('Failed to get user from database');
    throw error;
  }
}

export async function createUser(email: string, password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  try {
    return await db.insert(users).values({ email, password: hash });
  } catch (error) {
    console.error('Failed to create user in database');
    throw error;
  }
}

export async function createConversation({
  userId,
  title,
  visibility,
}: {
  userId: string;
  title: string;
  visibility: 'private' | 'public';
}) {
  try {
    const [conversation] = await db
      .insert(conversations)
      .values({
        id: crypto.randomUUID(),
        userId,
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return conversation;
  } catch (error) {
    console.error('Failed to create conversation in database');
    throw error;
  }
}

export async function getMessageById({ id }: { id: string }) {
  try {
    return await db.select().from(messages).where(eq(messages.id, id));
  } catch (error) {
    console.error('Failed to get message from database');
    throw error;
  }
}

export async function deleteMessagesByChatIdAfterTimestamp({
  chatId,
  timestamp
}: {
  chatId: string;
  timestamp: Date;
}) {
  try {
    return await db
      .delete(messages)
      .where(
        and(
          eq(messages.conversationId, chatId),
          gte(messages.createdAt, timestamp)
        )
      );
  } catch (error) {
    console.error('Failed to delete messages from database');
    throw error;
  }
}

export async function saveMessages({
  messages: messagesToSave
}: {
  messages: Array<{
    chatId: string;
    content: string;
    role: string;
  }>;
}) {
  try {
    return await db.insert(messages).values(
      messagesToSave.map(msg => ({
        id: crypto.randomUUID(),
        conversationId: msg.chatId,
        content: msg.content,
        role: msg.role,
        createdAt: new Date()
      }))
    );
  } catch (error) {
    console.error('Failed to save messages to database');
    throw error;
  }
}

export async function updateConversationVisibilityById({
  chatId,
  visibility
}: {
  chatId: string;
  visibility: 'private' | 'public';
}) {
  try {
    return await db
      .update(conversations)
      .set({ visibility })
      .where(eq(conversations.id, chatId));
  } catch (error) {
    console.error('Failed to update conversation visibility');
    throw error;
  }
}

// Added vote-related functions.  These are placeholders and should be replaced with actual implementation.
export async function upvoteMessage(messageId: string) {
    try {
        // Implement upvote logic here
        return await db.execute(sql`UPDATE messages SET upvotes = upvotes + 1 WHERE id = ${messageId}`);
    } catch (error) {
        console.error('Failed to upvote message');
        throw error;
    }
}

export async function downvoteMessage(messageId: string) {
    try {
        // Implement downvote logic here
        return await db.execute(sql`UPDATE messages SET downvotes = downvotes + 1 WHERE id = ${messageId}`);

    } catch (error) {
        console.error('Failed to downvote message');
        throw error;
    }
}


export async function getMessageVoteCount(messageId: string) {
    try {
      const [message] = await db.select({
        upvotes: messages.upvotes,
        downvotes: messages.downvotes,
      }).from(messages).where(eq(messages.id, messageId))
      return message;
    } catch (error) {
        console.error('Failed to get message vote count');
        throw error;
    }
}