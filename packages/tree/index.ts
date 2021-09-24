
/**
 * 构建Tree table
 * @param root 根节点数据
 * @param expend 是否要展开
 */
function convertTreeToList(data: any[] | {}) {
    const stack = [], array = [], hashMap = {};

    const stackFn = (root: {}) => {
        stack.push({ ...root, level: 0, expand: false });
        while (stack.length !== 0) {
            const node = stack.pop();
            visitNode(node, hashMap, array);
            if (node.children) {
                for (let i = node.children.length - 1; i >= 0; i--) {
                    stack.push({ ...node.children[i], level: node.level! + 1, parent: node, expand: false });
                }
            }
            if (!node.children.length) {
                node.children = null;
            }
        }
    }
    if (data instanceof Array) {
        data.forEach(root => {
            stackFn(root);
        });
    } else {
        stackFn(data);
    }
    return array;
}
/**
 * 遍历children节点并更新完整数组
 * @param node 当前节点
 * @param hashMap 是否映射
 * @param array 全局数组
 */
function visitNode(node, hashMap, array) {
    if (!hashMap[node.code]) {
        hashMap[node.id] = true;
        array.push(node);
    }
}

function convertListToTree(list, parentId) {
    let menuObj = {};
    list.forEach(item => {
        item.children = [];
        menuObj[item.id] = item;
    });
    return list.filter(item => {
        if (item.parentId !== parentId) {
            menuObj[item.parentId] && menuObj[item.parentId].children.push(item)
            return false;
        }
        return true;
    });
}


export default {convertTreeToList, convertListToTree};