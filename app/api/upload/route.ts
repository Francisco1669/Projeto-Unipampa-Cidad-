import { NextRequest, NextResponse } from 'next/server'
import { uploadImage } from '@/lib/cloudinary'
import { promises as fs } from 'fs'
import path from 'path'
import os from 'os'
import { randomUUID } from 'crypto'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Content-Type deve ser multipart/form-data' },
        { status: 400 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Arquivo não enviado' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'upload-'))
    const filePath = path.join(tempDir, `${randomUUID()}-${file.name}`)

    await fs.writeFile(filePath, buffer)

    const { url } = await uploadImage(filePath)

    await fs.unlink(filePath).catch(() => {})
    await fs.rmdir(tempDir).catch(() => {})

    return NextResponse.json({ url }, { status: 200 })
  } catch (error) {
    console.error('Erro no upload:', error)
    return NextResponse.json(
      { error: 'Erro ao fazer upload da imagem' },
      { status: 500 }
    )
  }
}
