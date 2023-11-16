#include <assert.h>
#include <string.h>
#include <stdio.h>
#include <tree_sitter/api.h>

// Declare the `tree_sitter_json` function, which is
// implemented by the `tree-sitter-json` library.
TSLanguage *tree_sitter_cpp();

char *readSourceFile(char *filename);

void traverse(TSNode child);

char *source_code;

int main()
{
  // Create a parser.
  TSParser *parser = ts_parser_new();

  // Set the parser's language (JSON in this case).
  ts_parser_set_language(parser, tree_sitter_cpp());

  // Build a syntax tree based on source code stored in a string.
  source_code = readSourceFile("test.cpp");
  TSTree *tree = ts_parser_parse_string(
      parser,
      NULL,
      source_code,
      strlen(source_code));

  TSNode root_node = ts_tree_root_node(tree);
  for (uint32_t i = 0, n = ts_node_named_child_count(root_node); i < n; i++)
  {
    TSNode child = ts_node_named_child(root_node, i);
    traverse(child);
  }
  free(source_code);
}

void traverse(TSNode child)
{
  for (uint32_t i = 0, n = ts_node_named_child_count(child); i < n; i++)
  {
    TSNode grandchild = ts_node_named_child(child, i);
    traverse(grandchild);
  }
  if (ts_node_is_named(child) && ts_node_named_child_count(child) == 0 && strcmp(ts_node_type(child), "identifier") == 0)
  {
    printf("Variable Name: %.*s\n", ts_node_end_byte(child) - ts_node_start_byte(child), source_code + ts_node_start_byte(child));
  }
  printf("Child: %s Name: %s\n", ts_node_type(child), ts_node_string(child));
}

char *readSourceFile(char *filename)
{
  FILE *fp;
  long lSize;
  char *buffer;

  fp = fopen(filename, "rb");
  if (!fp)
    perror(filename), exit(1);

  fseek(fp, 0L, SEEK_END);
  lSize = ftell(fp);
  rewind(fp);

  /* allocate memory for entire content */
  buffer = calloc(1, lSize + 1);
  if (!buffer)
    fclose(fp), fputs("memory alloc fails", stderr), exit(1);

  /* copy the file into the buffer */
  if (1 != fread(buffer, lSize, 1, fp))
    fclose(fp), free(buffer), fputs("entire read fails", stderr), exit(1);

  /* do your work here, buffer is a string contains the whole text */
  fclose(fp);
  return buffer;
}
