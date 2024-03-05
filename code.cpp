int a;
if (true) {
    a = 3;
    int c = 2
}
int b = 4;

int aux(int c) {
    return aux2(c, 2);
}

int aux2(int c) {
    return sum(c, 2);
}

int sum(int a, int b) {
    int d = 2;
    aux(d);
    return a + b;
}

int main() {
    int a = 3;
    int b = 4;
    return 0;
}