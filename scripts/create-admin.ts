import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../models/User'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/amigo-4-patas'

async function createAdmin() {
  try {
    console.log('🔌 Conectando ao MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Conectado!')

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@amigo4patas.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456'

    // Verificar se admin já existe
    const existingAdmin = await User.findOne({ email: adminEmail })
    if (existingAdmin) {
      console.log('⚠️  Usuário admin já existe!')
      return
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    // Criar admin
    const admin = await User.create({
      name: 'Administrador',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    })

    console.log('\n✅ Usuário admin criado com sucesso!')
    console.log(`📧 Email: ${admin.email}`)
    console.log(`🔑 Senha: ${adminPassword}`)
    console.log('\n⚠️  IMPORTANTE: Altere a senha após o primeiro login!')

  } catch (error) {
    console.error('❌ Erro:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    process.exit(0)
  }
}

createAdmin()