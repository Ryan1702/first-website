# vector 动态数组

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    // 1. 定义与初始化
    vector<int> a;       // 空数组
    vector<int> b(5, 0); // 5 个 0：{0, 0, 0, 0, 0}
    vector<int> c = {5, 2, 9, 2, 7, 2};

    // 2. 增删与大小
    a.push_back(10); // 末尾加 10
    a.push_back(20); // 末尾加 20
    a.pop_back();    // 删除末尾元素（20）
    cout << "size: " << a.size() << ", empty: " << a.empty() << "\n";
    cout << "front: " << c.front() << ", back: " << c.back() << "\n";

    // 3. 遍历
    for (int i = 0; i < (int)c.size(); i++)
    {
        cout << c[i] << " ";
    }
    cout << "\n";

    // 4. 排序与去重（先排序，再用 unique 把重复的移到后面，最后 erase 删掉）
    sort(c.begin(), c.end()); // 升序：2 2 2 5 7 9
    // 降序写法：sort(c.begin(), c.end(), greater<int>());
    c.erase(unique(c.begin(), c.end()), c.end()); // 去重后：2 5 7 9

    // 5. 二分查找、lower_bound 与 upper_bound（必须先升序排序）
    // lower_bound(x)：第一个 >= x 的位置
    // upper_bound(x)：第一个 > x 的位置
    bool has7 = binary_search(c.begin(), c.end(), 7);
    int idx_low = lower_bound(c.begin(), c.end(), 5) - c.begin(); // 第一个 >= 5 的下标
    int idx_up = upper_bound(c.begin(), c.end(), 5) - c.begin();  // 第一个 > 5 的下标
    cout << "has7: " << has7
         << ", first >= 5 index: " << idx_low
         << ", first > 5 index: " << idx_up << "\n";

    // 找某个数 x 出现了几次（用有序数组 v 演示）
    vector<int> v = {10, 20, 20, 20, 30, 40};
    int cnt20 = upper_bound(v.begin(), v.end(), 20) - lower_bound(v.begin(), v.end(), 20);
    cout << "count of 20 in v: " << cnt20 << "\n";

    // 找小于 20 的最后一个数（把 >= 20 的位置往前挪一位）
    auto it_less = lower_bound(v.begin(), v.end(), 20);
    if (it_less != v.begin())
    {
        it_less--;
        cout << "largest < 20 in v: " << *it_less << "\n";
    }

    // 6. 求和与清空
    long long sum = accumulate(c.begin(), c.end(), 0LL); // 0LL 防止爆 int
    cout << "sum: " << sum << "\n";
    a.clear(); // 清空元素，size 变 0

    return 0;
}
```
