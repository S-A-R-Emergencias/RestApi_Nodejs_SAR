import {config} from 'dotenv'

config()

export const PORT = process.env.PORT || 3000
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'sWch0On7KuPlkGx8BPf0'
export const DB_HOST = process.env.DB_HOST || 'containers-us-west-89.railway.app'
export const DB_PORT = process.env.DB_PORT || 5449
export const DB_DATABASE = process.env.DB_DATABASE || 'railway'