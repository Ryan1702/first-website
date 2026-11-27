# queue 队列

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    // ========== 1. 构造 ==========
    queue<int> q;     // 默认构造空队列（底层默认 deque<int>）
    queue<int> q2(q); // 拷贝构造另一个队列

    // ========== 2. 增删与访问（先进先出 FIFO）==========
    q.push(10);        // 元素从队尾入队
    q.emplace(20);     // 原地构造元素并从队尾入队
    int f = q.front(); // 获取队头元素（最早入队的；空队列调用会 UB）
    int b = q.back();  // 获取队尾元素（最后入队的；空队列调用会 UB）
    q.pop();           // 弹出队头元素（无返回值；空队列调用会 UB）

    // ========== 3. 容量与状态 ==========
    int sz = q.size();    // 返回队列中元素个数
    bool emp = q.empty(); // 判断队列是否为空（空返回 true）

    // ========== 4. 交换 ==========
    q.swap(q2); // 交换两个 queue 的内容

    // ========== 5. 标准清空/遍历写法 ==========
    // queue 不支持迭代器遍历，常规做法是循环读取 front() 并 pop()
    while (!q.empty())
    {
        auto cur = q.front();
        q.pop();
    }

    return 0;
}
```
