# list 双向链表

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    // ========== 1. 构造 ==========
    list<int> L1;                    // 空链表
    list<int> L2(5, 99);             // 5 个 99
    list<int> L3 = {10, 20, 30, 40}; // 初始化列表
    list<int> L4(L3);                // 拷贝构造

    cout << "L2：";
    for (auto x : L2)
        cout << x << " ";
    cout << "\n";

    // ========== 2. 头尾插入删除（最快）==========
    list<int> L;
    L.push_back(100); // 尾部加
    L.push_front(1);  // 头部加！vector 没有 push_front
    L.push_back(200);

    cout << "\npush 之后：";
    for (auto x : L)
        cout << x << " ";

    L.pop_back();  // 删除尾
    L.pop_front(); // 删除头
    cout << "\npop 头尾之后：";
    for (auto x : L)
        cout << x << " ";

    // ========== 3. 迭代器（重点！没有 []）==========
    list<int> a = {1, 2, 3, 4, 5};
    auto it = a.begin(); // 指向第一个元素（1）
    ++it;                // 往后走一步（2）；也可以 --it 往前（双向迭代器）
    cout << "\n\n第二个元素：" << *it;

    // ❌ 错误：a[2]; list 不支持下标随机访问！

    // ========== 4. insert ==========
    // insert(迭代器位置, 值)：插在迭代器指向元素的前面
    it = a.begin();
    ++it;              // 指向 2
    a.insert(it, 999); // 在 2 前面插入 999，变成 {1, 999, 2, 3, 4, 5}
    cout << "\ninsert 之后：";
    for (auto x : a)
        cout << x << " ";

    // ========== 5. erase ==========
    it = a.begin();
    ++it;             // 指向 999
    it = a.erase(it); // 删除 999，并返回下一个有效迭代器（指向 2）
    cout << "\nerase 之后：";
    for (auto x : a)
        cout << x << " ";
    cout << "\nerase 后 it 指向：" << *it;

    // ========== 6. 常用成员函数 ==========
    cout << "\n\n大小 size：" << a.size();
    cout << "\n是否空 empty：" << a.empty();
    cout << "\n首元素 front：" << a.front();
    cout << "\n尾元素 back：" << a.back();

    a.clear(); // 清空
    cout << "\nclear 之后 empty：" << a.empty();

    // ========== 7. 链表专属函数 ==========
    list<int> A = {1, 3, 5, 7};
    list<int> B = {2, 4, 6};

    A.sort(); // list 自带 sort！不是 sort(A.begin(), A.end())
    B.sort();

    A.merge(B); // 合并两个有序链表，B 直接变空！
    cout << "\n\nmerge 之后 A：";
    for (auto x : A)
        cout << x << " ";

    A.reverse(); // 反转链表
    cout << "\nreverse：";
    for (auto x : A)
        cout << x << " ";

    A.unique(); // 删除相邻连续重复元素
    cout << "\nunique：";
    for (auto x : A)
        cout << x << " ";

    A.remove(3); // 删除所有等于 3 的元素
    cout << "\nremove(3)：";
    for (auto x : A)
        cout << x << " ";

    // ========== 8. splice 转移链表节点 ==========
    list<int> X = {11, 22, 33};
    list<int> Y = {999, 888};
    auto pos = X.begin();
    ++pos;            // 指向 22
    X.splice(pos, Y); // 把 Y 全部挪到 X 的 pos 前面，Y 变空
    cout << "\n\nsplice 之后 X：";
    for (auto x : X)
        cout << x << " ";
    cout << "\nY 现在大小：" << Y.size() << "\n";

    return 0;
}
```
