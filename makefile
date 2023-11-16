all: compile

compile:
	clang                                 	\
		-I tree-sitter/lib/include            \
		test-cpp-parser.c                    	\
		tree-sitter-cpp/src/parser.c         	\
		tree-sitter-cpp/src/scanner.c					\
		tree-sitter/libtree-sitter.a          \
		-o test-cpp-parser

clean: 
	rm -f test-cpp-parser