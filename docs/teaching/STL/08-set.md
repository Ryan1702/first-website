# set / multiset 集合

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    // 1. 普通 set：自动从小到大排序，且自动去重
    set<int> s;
    s.insert(30);
    s.insert(10);
    s.insert(20);
    s.insert(40);
    s.insert(20); // 重复元素不会插进去

    // 2. 查找与删除
    if (s.find(20) != s.end())
    { // 找到了
        cout << "20 exists\n";
    }
    s.erase(10); // 删除值为 10 的元素

    // 3. 遍历（从小到大输出）
    for (auto it = s.begin(); it != s.end(); it++)
    {
        cout << *it << " ";
    }
    cout << "\n";

    // 4. lower_bound / upper_bound（注意：set 要用成员函数 s.lower_bound / s.upper_bound）
    // lower_bound(x)：第一个 >= x 的元素迭代器
    // upper_bound(x)：第一个 > x 的元素迭代器
    auto it1 = s.lower_bound(20);
    auto it2 = s.upper_bound(20);
    if (it1 != s.end())
    {
        cout << "first >= 20: " << *it1 << "\n"; // 20
    }
    if (it2 != s.end())
    {
        cout << "first > 20:  " << *it2 << "\n"; // 30
    }

    // 输出 [20, 30] 闭区间内的所有元素
    cout << "elements in [20, 30]: ";
    for (auto it = s.lower_bound(20); it != s.upper_bound(30); it++)
    {
        cout << *it << " ";
    }
    cout << "\n";

    // 5. multiset：允许重复元素，同样自动排序
    multiset<int> ms;
    ms.insert(5);
    ms.insert(5);
    ms.insert(8);
    cout << "count of 5: " << ms.count(5) << "\n";

    // 注意：ms.erase(5) 会把所有的 5 都删掉！
    // 如果只想删一个 5，先用 find 找出来再传迭代器：
    auto p = ms.find(5);
    if (p != ms.end())
    {
        ms.erase(p);
    }
    cout << "count of 5 after erasing one: " << ms.count(5) << "\n";

    return 0;
}
```
