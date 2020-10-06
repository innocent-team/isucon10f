package main

import (
	"sync"

	xsuportal "github.com/isucon/isucon10-final/webapp/golang"
)

type jobQueue struct {
	queue []xsuportal.BenchmarkJob
	sync.RWMutex
}

var q jobQueue

func (q *jobQueue) enqueue(job xsuportal.BenchmarkJob) {
	q.Lock()
	defer q.Unlock()
	q.queue = append(q.queue, job)
}

func (q *jobQueue) dequeue() *xsuportal.BenchmarkJob {
	q.Lock()
	defer q.Unlock()
	if len(q.queue) == 0 {
		return nil
	}
	job := q.queue[0]

	q.queue = q.queue[1:]

	return &job
}
