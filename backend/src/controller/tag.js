/*
* 标签控制器
* 场景：创建标签 / 获取标签
* */
const Tag = require("../model/tag")
const HttpException = require("../exception/http.exception")

// 创建标签
const createTagController = async (req, res, next) => {
    // req, res,一定不能反
    try {
        console.log('createTagController')
        // console.log(req.body)
        const tag = req.body.tag
        // 标签校验
        if (!tag) {
            throw new HttpException(401, "标签必须存在", "tag not found")
        }

        // 标签存储
        const result = await Tag.create({name: tag})
        // console.log(result)

        // 返回数据
        return res.status(200).json({
            status: 1,
            message: '标签创建成功',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

// 获取标签列表 [tagName1,...]
const getTagController = async (req, res, next) => {
    try {
        console.log('getTagController|')
        const tagsAll = await Tag.findAll()
        // console.log(tagsAll)
        const tags = []
        if (tagsAll.length > 0) {
            for (const tag of tagsAll) {
                tags.push(tag.name)
            }
        }

        res.status(200).json({
            status: 1,
            message: '标签创建成功',
            data: tags
        })
    } catch (error) {
        next(error)
    }
}

// 删除标签
const deleteTagController = async (req, res, next) => {
    try {
        console.log('deleteTagController')
        const tag = req.params.tag
        await Tag.destroy({
            where: {
                name: tag
            }
        })

        res.status(200).json({
            status: 1,
            message: '标签删除成功',
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createTagController, getTagController, deleteTagController
}