
import { pgTable, text, timestamp, uuid, boolean, numeric, jsonb, varchar } from 'drizzle-orm/pg-core';

export const businesses = pgTable('businesses', {
  id: uuid('id').primaryKey(),
  ownerId: uuid('owner_id').notNull(),
  name: text('name'),
  isPublic: boolean('is_public').notNull().default(false),
  publicAccessFee: numeric('public_access_fee'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  businessId: uuid('business_id').references(() => businesses.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const businessAccesses = pgTable('business_accesses', {
  id: uuid('id').primaryKey(),
  accessingBusinessId: uuid('accessing_business_id').references(() => businesses.id, { onDelete: 'cascade' }),
  targetBusinessId: uuid('target_business_id').references(() => businesses.id, { onDelete: 'cascade' }),
  hasAccess: boolean('has_access'),
  accessType: text('access_type'),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

export const conversations = pgTable('conversations', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  businessId: uuid('business_id').references(() => businesses.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey(),
  conversationId: uuid('conversation_id').references(() => conversations.id),
  senderId: uuid('sender_id').references(() => users.id),
  role: text('role'),
  content: text('content'),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

export const ragChunks = pgTable('rag_chunks', {
  id: uuid('id').primaryKey(),
  businessId: uuid('business_id').references(() => businesses.id, { onDelete: 'set null' }),
  chunkText: text('chunk_text'),
  embedding: varchar('embedding', { length: 1536 }),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

export const ragQueries = pgTable('rag_queries', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  businessId: uuid('business_id').references(() => businesses.id, { onDelete: 'set null' }),
  queryText: text('query_text'),
  responseText: text('response_text'),
  timestamp: timestamp('timestamp').notNull().defaultNow()
});
