import mongoose from 'mongoose'
import Dog from '../models/Dog'
import HappyStory from '../models/HappyStory'
import dogsData from '../data/dogs.json'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/amigo-4-patas'

async function seed() {
  try {
    console.log('🔌 Conectando ao MongoDB...')
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Conectado ao MongoDB!')

    // Limpar dados existentes
    console.log('🗑️  Limpando dados existentes...')
    await Dog.deleteMany({})
    await HappyStory.deleteMany({})
    console.log('✅ Dados limpos!')

    // Inserir cães
    console.log('🐕 Inserindo cães...')
    const dogs = await Dog.insertMany(dogsData.dogs)
    console.log(`✅ ${dogs.length} cães inseridos!`)

    // Inserir histórias felizes
    console.log('📖 Inserindo histórias felizes...')
    const stories = await HappyStory.insertMany(dogsData.happyStories)
    console.log(`✅ ${stories.length} histórias inseridas!`)

    console.log('\n🎉 Seed concluído com sucesso!')
    console.log(`\n📊 Resumo:`)
    console.log(`   - ${dogs.length} cães`)
    console.log(`   - ${stories.length} histórias felizes`)

  } catch (error) {
    console.error('❌ Erro ao fazer seed:', error)
    process.exit(1)
  } finally {
    await mongoose.connection.close()
    console.log('\n👋 Conexão com MongoDB fechada')
    process.exit(0)
  }
}

seed()
