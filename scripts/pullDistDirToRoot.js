const fs = require('fs-extra')
const path = require('path')

const {
  compilerOptions: {
    outDir = 'dist'
  } = {}
} = fs.readJsonSync('./tsconfig.json') || {}
const [, , parentDir] = path.resolve(__dirname).split('\\').reverse()

// Skip this script if we are developing it
if (parentDir !== 'node_modules') return

const resolvedOutDir = path.resolve(outDir)
const randomDistName = `dist_${Date.now()}`
const randomDistPath = path.join('..', randomDistName)
const resolvedCurrentDir = path.resolve('.')

// Move 'outDir' up
fs.moveSync(resolvedOutDir, randomDistPath)

// Remove all from current dir
fs.emptyDirSync(resolvedCurrentDir)

// Copy content from 'randomDistName' to current dir
fs.copySync(randomDistPath, resolvedCurrentDir)

// Remove 'randomDistName'
fs.removeSync(randomDistPath)
