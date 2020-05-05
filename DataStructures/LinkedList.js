class Node {
	constructor (value) {
		this.value = value;
		this.next = null;
	}
}

class linkedList {
	constructor (value) {
		this.head = {
			value,
			next: null
		};
		this.tail = this.head;
		this.length = 1;
	}

	append (value) {
		const newNode = new Node(value);
		this.tail.next = newNode;
		this.tail = newNode;
		this.length++;
		return this;
	}

	prepend (value) {
		const newNode = new Node(value);
		newNode.next = this.head;
		this.head = newNode;
		this.length++;
		return this;
	}

	insert (index, value) {}

	remove (index) {}
}

module.exports = linkedList;
