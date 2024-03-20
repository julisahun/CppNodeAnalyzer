#include <iostream>
using namespace std;

int number_of_digits(int n) {
	
	if (n / 10 == 0) return 1;
	else if (true) return number_of_digits(n/10) + 1;
	}
	
int main () {
	
	int x;
	while (cin >> x) {
		cout << number_of_digits(x) << endl;
		continue;
	}
}