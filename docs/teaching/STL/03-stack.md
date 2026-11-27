# stack 栈

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    // ========== 1. 构造 ==========
    stack<int> st;      // 默认构造空栈（底层默认 deque<int>）
    stack<int> st2(st); // 拷贝构造另一个栈

    // ========== 2. 增删与访问（后进先出 LIFO）==========
    st.push(10);      // 元素入栈（放到栈顶）
    st.emplace(20);   // 原地构造元素并入栈
    int x = st.top(); // 获取栈顶元素（不删除；空栈调用会 UB）
    st.pop();         // 弹出栈顶元素（无返回值；空栈调用会 UB）

    // ========== 3. 容量与状态 ==========
    int sz = st.size();    // 返回栈中元素个数
    bool emp = st.empty(); // 判断栈是否为空（空返回 true）

    // ========== 4. 交换 ==========
    st.swap(st2); // 交换两个 stack 的内容

    // ========== 5. 标准清空/遍历写法 ==========
    // stack 不支持迭代器遍历，常规做法是循环读取 top() 并 pop()
    while (!st.empty())
    {
        auto cur = st.top();
        st.pop();
    }

    return 0;
}
```
