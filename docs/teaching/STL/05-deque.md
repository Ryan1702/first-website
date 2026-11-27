# deque 双端队列

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    // ========== 1. 构造 ==========
    deque<int> d1;        // 空
    deque<int> d2(4, 88); // 4 个 88
    deque<int> d3 = {1, 2, 3, 4, 5};
    deque<int> d4(d3); // 拷贝

    cout << "d2：";
    for (auto x : d2)
        cout << x << " ";
    cout << "\n";

    // ========== 2. 双端插入删除 ==========
    deque<int> d;
    d.push_back(100); // 尾加 -> {100}
    d.push_front(1);  // 头加 -> {1, 100}
    d.push_back(200); // 尾加 -> {1, 100, 200}
    d.push_front(99); // 头加 -> {99, 1, 100, 200}

    cout << "\npush 之后：";
    for (auto x : d)
        cout << x << " ";

    d.pop_back();  // 删尾 -> {99, 1, 100}
    d.pop_front(); // 删头 -> {1, 100}
    cout << "\npop 头尾之后：";
    for (auto x : d)
        cout << x << " ";

    // ========== 3. 随机访问！支持 [] ==========
    cout << "\n\n下标访问 d[1] = " << d[1]; // 100

    // ========== 4. 迭代器（随机访问迭代器，支持 + n / += n）==========
    deque<int> md = {10, 20, 30, 40};
    auto it = md.begin(); // 指向 10（下标 0）
    ++it;                 // 指向 20（下标 1）
    it += 2;              // 指向 40（下标 3），合法不越界
    cout << "\nit 偏移后指向：" << *it;

    // ========== 5. insert / erase ==========
    deque<int> a = {10, 20, 30, 40};
    it = a.begin();
    ++it;              // 指向 20
    a.insert(it, 999); // 在 20 前面插入 999 -> {10, 999, 20, 30, 40}
    cout << "\n\ninsert：";
    for (auto x : a)
        cout << x << " ";

    it = a.begin();
    ++it;             // 指向 999
    it = a.erase(it); // 删除 999，返回指向 20 的迭代器
    cout << "\nerase：";
    for (auto x : a)
        cout << x << " ";

    // ========== 6. 基础函数 ==========
    cout << "\n\nsize：" << a.size();
    cout << "\nempty：" << a.empty();
    cout << "\nfront：" << a.front();
    cout << "\nback：" << a.back();

    a.clear();
    cout << "\nclear 后 empty：" << a.empty();

    // ========== 7. 排序！可以直接用 sort / reverse ==========
    deque<int> sd = {5, 2, 7, 1, 3};
    sort(sd.begin(), sd.end());
    cout << "\n\nsort 之后：";
    for (auto x : sd)
        cout << x << " ";

    reverse(sd.begin(), sd.end());
    cout << "\nreverse：";
    for (auto x : sd)
        cout << x << " ";
    cout << "\n";

    return 0;
}
```
