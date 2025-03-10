// 在你的 index.js 文件顶部添加以下代码

const express = require('express')
const expressWs = require('express-ws')
const app = express()
const wsInstance = expressWs(app)
// 启用 CORS
const cors = require('cors')
app.use(cors())

// 监听端口
const port = 3600

const { Ollama } = require('@langchain/community/llms/ollama')

const model = new Ollama({
    baseUrl: 'http://localhost:11434',
    model: 'deepseek-r1:14b',
    temperature: 0.7
})

// WebSocket 路由处理聊天功能
app.ws('/question', async (ws, req) => {
    console.log('新的WebSocket连接已建立')
    
    ws.on('message', async (msg) => {
        try {
            console.log('收到消息:', msg.toString())
            const question = msg.toString()
            
            // 开始生成回答
            try {
                console.log('开始生成回答...')
                const stream = await model.stream(question)
                let fullResponse = ''
                
                for await (const chunk of stream) {
                    // 确保chunk是字符串
                    const chunkStr = chunk.toString()
                    fullResponse += chunkStr
                    
                    // 发送部分响应，确保每个chunk都被发送
                    console.log('发送chunk:', chunkStr)
                    ws.send(JSON.stringify({ 
                        data: chunkStr,
                        isEnd: false 
                    }))
                }
                
                // 发送完成标记
                console.log('回答完成，完整响应:', fullResponse)
                ws.send(JSON.stringify({ 
                    data: '',
                    isEnd: true 
                }))
                
            } catch (modelError) {
                console.error('模型调用错误:', modelError)
                ws.send(JSON.stringify({ 
                    data: '抱歉，AI模型暂时无法响应，请稍后再试。',
                    isEnd: true,
                    error: true 
                }))
            }
        } catch (error) {
            console.error('处理消息时出错:', error)
            ws.send(JSON.stringify({ 
                data: '抱歉，处理您的请求时出现错误。',
                isEnd: true,
                error: true 
            }))
        }
    })

    ws.on('close', () => {
        console.log('WebSocket连接已关闭')
    })

    ws.on('error', (error) => {
        console.error('WebSocket错误:', error)
    })
})

// 健康检查端点
app.get('/health', (req, res) => {
    res.json({ status: 'ok' })
})

// 启动 Express 服务
app.listen(port, () => {
    console.log(`服务器已启动，监听端口 ${port}`)
})
