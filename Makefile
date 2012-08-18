NODEUNIT = node_modules/nodeunit/bin/nodeunit

test_all:
	$(NODEUNIT) ./test

.PHONY: test_all
