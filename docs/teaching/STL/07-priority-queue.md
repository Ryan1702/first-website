# priority_queue 优先队列（堆）

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    // 1. 默认是大顶堆：每次取出的 top() 都是最大的数
    priority_queue<int> big_pq;
    big_pq.push(10);
    big_pq.push(30);
    big_pq.push(20);

    cout << "max top: " << big_pq.top() << "\n";  // 30
    big_pq.pop();                                 // 弹出 30
    cout << "next top: " << big_pq.top() << "\n"; // 20

    // 2. 小顶堆：每次取出的 top() 都是最小的数
    priority_queue<int, vector<int>, greater<int>> small_pq;
    small_pq.push(10);
    small_pq.push(30);
    small_pq.push(20);

    cout << "min top: " << small_pq.top() << "\n";  // 10
    small_pq.pop();                                 // 弹出 10
    cout << "next top: " << small_pq.top() << "\n"; // 20

    // 3. 清空与判空常见写法
    while (!small_pq.empty())
    {
        cout << small_pq.top() << " ";
        small_pq.pop();
    }
    cout << "\n";

    // 4. 存 pair 的常见写法（默认先比 first，再比 second，大的在前）
    priority_queue<pair<int, int>> pair_pq;
    pair_pq.push(make_pair(1, 5));
    pair_pq.push(make_pair(2, 1));
    pair_pq.push(make_pair(2, 4));

    while (!pair_pq.empty())
    {
        pair<int, int> cur = pair_pq.top();
        pair_pq.pop();
        cout << "(" << cur.first << ", " << cur.second << ") ";
    }
    cout << "\n";

    return 0;
}
```
