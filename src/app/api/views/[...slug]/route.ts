import { NextRequest, NextResponse } from 'next/server';

import oracledb from 'oracledb';
import * as process from 'process';

import { joinSlugs } from '@/lib/utils';

import queries from '@/app/api/queries';
import { closeConnection } from '@/app/api/utils';

import dbconfig from '~/dbconfig';

export const dynamic = 'force-dynamic';
const handler = async (method: 'GET' | 'POST', _slug: string[]) => {
  const query =
    method === 'GET'
      ? queries.CREATE_VIEW_COUNT_IF_NOT_EXIST
      : queries.UPDATE_VIEW_COUNT;
  const slug = joinSlugs(_slug);

  if (!slug) {
    return NextResponse.json(
      {
        message: 'Slug is required',
      },
      { status: 400 }
    );
  }

  let connection: oracledb.Connection | null = null;
  try {
    connection = await oracledb.getConnection(dbconfig);

    await connection.execute(
      query,
      {
        slug: { val: slug },
      },
      {
        autoCommit: true,
      }
    );

    const { rows: result } = await connection.execute<{ count: number }>(
      queries.READ_VIEW_COUNT,
      [slug],
      {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      }
    );

    return NextResponse.json(
      {
        viewCount: result?.[0]?.count || 1,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: (e as Error).message },
      { status: 500 }
    );
  } finally {
    await closeConnection(connection);
  }
};

export const POST = async (
  req: NextRequest,
  context: { params: { slug: string[] } }
) => {
  const ipAddress =
    (req.headers.get('x-forwarded-for') as string)?.split(',')[0] || '::1';

  if (
    ipAddress === process.env.OWN_IP ||
    ipAddress === '127.0.0.1' ||
    ipAddress === '::1'
  ) {
    return NextResponse.json(
      {
        message: "View counts are not increased at owner's viewing",
      },
      {
        status: 200,
      }
    );
  }

  return handler('POST', context.params.slug);
};

export const GET = (
  req: NextRequest,
  context: { params: { slug: string[] } }
) => {
  return handler('GET', context.params.slug);
};
