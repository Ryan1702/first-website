# map 映射

```cpp
#include <bits/stdc++.h>
using namespace std;
int main()
{
    // 1. 定义：key 是 string，value 是 int，默认按 key 从小到大排序
    map<string, int> mp;

    // 2. 赋值与统计次数（最常用）
    mp["apple"] = 3;
    mp["banana"] = 2;
    mp["apple"]++; // 变成 4

    // 统计字符串出现次数
    string arr[] = {"cat", "dog", "cat", "bird", "cat"};
    for (int i = 0; i < 5; i++)
    {
        mp[arr[i]]++;
    }

    // 3. 查找（注意：如果只是判断有没有，优先用 find，别直接写 mp["xxx"]，否则会自动插一个 0 进去）
    if (mp.find("dog") != mp.end())
    {
        cout << "dog count: " << mp["dog"] << "\n";
    }

    // 4. 删除
    mp.erase("banana"); // 按 key 删除

    // 5. 遍历
    for (auto it = mp.begin(); it != mp.end(); it++)
    {
        cout << it->first << " -> " << it->second << "\n";
    }

    // 6. lower_bound / upper_bound（按 key 从小到大查找）
    // 例子：按最低分数线查等级
    map<int, string> grade;
    grade[0] = "Fail";
    grade[60] = "Pass";
    grade[80] = "Good";
    grade[90] = "Excellent";

    int score = 85;
    // upper_bound(score) 找第一个 key > 85 的位置（90），往前退一步就是 <= 85 的最大 key（80）
    auto it_up = grade.upper_bound(score);
    if (it_up != grade.begin())
    {
        it_up--;
        cout << "score " << score << " -> " << it_up->second << "\n"; // Good
    }

    // 找第一个最低分数线 >= 60 的档位
    auto it_low = grade.lower_bound(60);
    if (it_low != grade.end())
    {
        cout << "first grade with min score >= 60: " << it_low->second << "\n"; // Pass
    }

    cout << "map size: " << mp.size() << "\n";
    return 0;
}
```
