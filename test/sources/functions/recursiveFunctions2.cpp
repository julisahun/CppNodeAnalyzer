int sum(int a);

int sum2(int a) {
    if (a == 0) {
        return 0;
    }
    return a + sum(a - 1);
}

int sum(int a) {
  if (a == 0) {
    return 0;
  }
  return a + sum2(a - 1);
}

