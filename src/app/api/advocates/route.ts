import db from "../../../db";
import { advocates } from "../../../db/schema";
import { count, like, or, sql } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  
  const offset = (page - 1) * limit;

  try {
    let whereCondition;
    
    if (search) {
      const searchTerm = search.trim();
      
      const exactPrefixConditions = [
        like(advocates.firstName, `${searchTerm}%`),
        like(advocates.lastName, `${searchTerm}%`),
        like(advocates.city, `${searchTerm}%`),
        like(advocates.degree, `${searchTerm}%`)
      ];
      
      const specialtyCondition = sql`${advocates.specialties} @> ${JSON.stringify([searchTerm])}`;
      
      const fuzzyConditions = [
        like(advocates.firstName, `%${searchTerm}%`),
        like(advocates.lastName, `%${searchTerm}%`),
        like(advocates.city, `%${searchTerm}%`),
        like(advocates.degree, `%${searchTerm}%`)
      ];
      
      whereCondition = or(
        ...exactPrefixConditions,
        specialtyCondition,
        ...fuzzyConditions
      );
    }

    const data = await db
      .select()
      .from(advocates)
      .where(whereCondition)
      .limit(limit)
      .offset(offset)
      .orderBy(advocates.lastName, advocates.firstName);

    const [totalResult] = await db
      .select({ count: count() })
      .from(advocates)
      .where(whereCondition);

    const total = totalResult.count;
    const totalPages = Math.ceil(total / limit);

    return Response.json({
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore: page < totalPages
      }
    });
  } catch (error) {
    console.error("Database query failed:", error);
    return Response.json({ error: "Failed to fetch advocates" }, { status: 500 });
  }
}
