function ercha(root){
    if (!root){
        return
    }
    let l = 0
    let r = 0
    ercha(root.left)
    l++
    ercha(root.right)
    r++
}

let i = 0

promise.all()
