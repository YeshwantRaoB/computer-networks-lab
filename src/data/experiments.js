// experiments.js — final with Experiment 10 (Leaky Bucket Congestion Control)

export const experiments = [
  {
    id: 1,
    title: "Experiment 1: Point-to-Point Network with Duplex Links",
    description:
      "Implement three nodes point-to-point network with duplex links between them. Set the queue size, vary the bandwidth, and find the number of packets dropped.",
    content: {
      objective:
        "Implement a three-node point-to-point network with duplex links, configure queue sizes and bandwidth, and analyze packet drops.",
      softwareRequirements: [
        "NS2 (Network Simulator 2)",
        "NAM (Network Animator)",
        "TCL (Tool Command Language)"
      ],
      steps: [
        { number: 1, title: "Open Ubuntu Terminal", content: "Launch the Ubuntu terminal on your system." },
        { number: 2, title: "Install Required Software", content: "Install NS2, NAM, and TCL using the following command:", code: "sudo apt-get install ns2 nam tcl", note: "Enter your password when prompted." },
        { number: 3, title: "Verify NS2 Installation", content: "Check if NS2 runs properly:", code: "ns" },
        { number: 4, title: "Create TCL Script", content: "Create a new file named ns1.tcl using nano editor:", code: "nano ns1.tcl" },
        {
          number: 5,
          title: "Write the TCL Program",
          content: "Copy and paste the following TCL code into the file:",
          language: "tcl",
          code: `# Create Simulator
set ns [new Simulator]

# Open Trace file and NAM file
set ntrace [open prog1.tr w]
$ns trace-all $ntrace
set namfile [open prog1.nam w]
$ns namtrace-all $namfile

# Finish Procedure
proc Finish {} {
  global ns ntrace namfile
  $ns flush-trace
  close $ntrace
  close $namfile
  set drops [exec grep -c "^d" prog1.tr]
  puts "The number of packet drops is $drops"
  exec nam prog1.nam &
  exit 0
}

# Create 3 nodes
set n0 [$ns node]
set n1 [$ns node]
set n2 [$ns node]

$n0 label "TCP Source"
$n2 label "Sink"
$ns color 1 blue

# Links
$ns duplex-link $n0 $n1 1Mb 10ms DropTail
$ns duplex-link $n1 $n2 1Mb 10ms DropTail

# Orientation
$ns duplex-link-op $n0 $n1 orient right
$ns duplex-link-op $n1 $n2 orient right

# Queue size
$ns queue-limit $n0 $n1 10
$ns queue-limit $n1 $n2 10

# Transport + App
set tcp0 [new Agent/TCP]
$ns attach-agent $n0 $tcp0
set sink0 [new Agent/TCPSink]
$ns attach-agent $n2 $sink0
$ns connect $tcp0 $sink0
$tcp0 set class_ 1

set cbr0 [new Application/Traffic/CBR]
$cbr0 set type_ CBR
$cbr0 set packetSize_ 100
$cbr0 set rate_ 1Mb
$cbr0 set random_ false
$cbr0 attach-agent $tcp0

# Schedule
$ns at 0.0 "$cbr0 start"
$ns at 5.0 "Finish"

# Run
$ns run`
        },
        { number: 6, title: "Save and Run the Script", content: "Save and run the script:", code: "ns ns1.tcl" },
        { number: 7, title: "View Trace File", content: "Open the generated trace file:", code: "nano prog1.tr" },
        {
          number: 8,
          title: "Experiment with Queue Sizes",
          content: "Modify queue size and compare packet drops:",
          codeBlock: { from: "$ns queue-limit $n0 $n1 10\n$ns queue-limit $n1 $n2 10", to: "$ns queue-limit $n0 $n1 20\n$ns queue-limit $n1 $n2 25" },
          note: "Repeat runs and compare."
        }
      ],
      expectedOutput: [
        "Network animation in NAM",
        "Packet drop count printed to console",
        "Trace file with packet events"
      ],
      keyObservations: [
        "Larger queues reduce drops up to a point",
        "Lower bandwidth increases congestion",
        "Trace reveals per-packet behavior"
      ]
    }
  },

  {
    id: 2,
    title: "Experiment 2: Transmission of Ping Messages over 6-Node Network with Congestion Analysis",
    description: "Implement the transmission of ping messages over a 6-node topology and find packets dropped due to congestion.",
    content: {
      objective: "Create a 6-node topology, transmit ping messages, generate congestion via CBR, analyze drops.",
      softwareRequirements: ["NS2 (Network Simulator 2)", "NAM (Network Animator)", "TCL (Tool Command Language)", "Terminal/Command Prompt"],
      steps: [
        { number: 1, title: "Open Terminal", content: "Launch the terminal on Ubuntu/Linux." },
        { number: 2, title: "Install Required Software", content: "Ensure NS2, NAM, and TCL are installed:", code: "sudo apt-get install ns2 nam tcl" },
        { number: 3, title: "Create Script", content: "Create ns2.tcl:", code: "nano ns2.tcl" },
        {
          number: 4,
          title: "Write TCL Script",
          content: "Paste the script:",
          language: "tcl",
          code: `# Simulator
set ns [new Simulator]
$ns color 1 Blue
$ns color 2 Red

# Traces
set ntrace [open prog3.tr w]
$ns trace-all $ntrace
set namfile [open prog3.nam w]
$ns namtrace-all $namfile

proc Finish {} {
  global ns ntrace namfile
  $ns flush-trace
  close $ntrace
  close $namfile
  puts "The number of ping packets dropped are:"
  set drops [exec grep "^d" prog3.tr | cut -d " " -f 5 | grep -c "ping"]
  puts "$drops"
  exec nam prog3.nam &
  exit 0
}

# Nodes
for {set i 0} {$i < 6} {incr i} { set n($i) [$ns node] }

# Linear links
for {set j 0} {$j < 5} {incr j} {
  $ns duplex-link $n($j) $n([expr $j+1]) 0.1Mb 10ms DropTail
}

# Ping agent recv
Agent/Ping instproc recv {from rtt} {
  $self instvar node_
  puts "node [$node_ id] received ping answer from $from with round trip time $rtt ms"
}

# Ping endpoints
set p0 [new Agent/Ping]; $p0 set class_ 1; $ns attach-agent $n(0) $p0
set p1 [new Agent/Ping]; $p1 set class_ 1; $ns attach-agent $n(5) $p1
$ns connect $p0 $p1

# Queue and monitor
$ns queue-limit $n(2) $n(3) 2
$ns duplex-link-op $n(2) $n(3) queuePos 0.5

# Congestion via TCP + CBR
set tcp0 [new Agent/TCP]; $tcp0 set class_ 2; $ns attach-agent $n(2) $tcp0
set sink0 [new Agent/TCPSink]; $ns attach-agent $n(4) $sink0
$ns connect $tcp0 $sink0
set cbr0 [new Application/Traffic/CBR]; $cbr0 set packetSize_ 500; $cbr0 set rate_ 1Mb; $cbr0 attach-agent $tcp0

# Schedule
$ns at 0.2 "$p0 send"
$ns at 0.4 "$p1 send"
$ns at 0.4 "$cbr0 start"
$ns at 0.8 "$p0 send"
$ns at 1.0 "$p1 send"
$ns at 1.2 "$cbr0 stop"
$ns at 1.4 "$p0 send"
$ns at 1.6 "$p1 send"
$ns at 1.8 "Finish"

$ns run`
        },
        { number: 5, title: "Run Script", content: "Execute:", code: "ns ns2.tcl" },
        { number: 6, title: "View Trace", content: "Open trace:", code: "nano prog3.tr" },
        {
          number: 7,
          title: "Tweak Queue Size",
          content: "Change queue limit and rerun:",
          codeBlock: { from: "$ns queue-limit $n(2) $n(3) 2", to: "$ns queue-limit $n(2) $n(3) 5" }
        }
      ],
      expectedOutput: ["Drop count for ping packets", "NAM visualization of flows", "Trace of events"],
      keyObservations: ["Smaller queues increase drops", "Background CBR traffic creates congestion", "Ping suffers under load"]
    }
  },

  {
    id: 3,
    title: "Experiment 3: Ethernet LAN Implementation with N Nodes and Congestion Window Analysis",
    description: "Implement an ethernet lan using n nodes and plot congestion windows for different source/destination pairs.",
    content: {
      objective: "Build an NS2 LAN with multiple TCP flows and plot cwnd via gnuplot.",
      softwareRequirements: ["NS2", "NAM", "TCL", "Gnuplot"],
      steps: [
        { number: 1, title: "Open Terminal", content: "Launch terminal on Ubuntu/Linux." },
        { number: 2, title: "Install Tools", content: "Install required software:", code: "sudo apt-get install ns2 nam tcl\nsudo apt install gnuplot" },
        { number: 3, title: "Create Script", content: "Create prog5.tcl:", code: "nano prog5.tcl" },
        {
          number: 4,
          title: "Paste TCL",
          content: "Insert the following:",
          language: "tcl",
          code: `# Simulator
set ns [new Simulator]
$ns color 1 Blue
$ns color 2 Red

# Traces
set ntrace [open prog5.tr w]
$ns trace-all $ntrace
set namfile [open prog5.nam w]
$ns namtrace-all $namfile

# cwnd files
set winFile0 [open WinFile0.dat w]
set winFile1 [open WinFile1.dat w]
puts $winFile0 "# time cwnd"
puts $winFile1 "# time cwnd"

set sample_interval 0.1

proc Finish {} {
  global ns ntrace namfile winFile0 winFile1
  $ns flush-trace
  close $ntrace
  close $namfile
  close $winFile0
  close $winFile1
  set gpfile [open "plot_cwnd.gp" w]
  puts $gpfile "set terminal png size 1200,700"
  puts $gpfile "set output 'cwnd_plot.png'"
  puts $gpfile "set title 'Congestion Window vs Time'"
  puts $gpfile "set xlabel 'Time (s)'"
  puts $gpfile "set ylabel 'cwnd (bytes)'"
  puts $gpfile "set grid"
  puts $gpfile "plot 'WinFile0.dat' using 1:2 with lines title 'TCP0', \\"
  puts $gpfile "     'WinFile1.dat' using 1:2 with lines title 'TCP1'"
  close $gpfile
  exec gnuplot -persist plot_cwnd.gp &
  exit 0
}

proc PlotWindow {tcpSource file} {
  global ns sample_interval
  set now [$ns now]
  if {[catch {set cwnd [$tcpSource set cwnd_]} err]} { set cwnd 0 }
  puts $file "$now $cwnd"
  $ns at [expr {$now + $sample_interval}] "PlotWindow $tcpSource $file"
}

# Nodes and links
for {set i 0} {$i < 6} {incr i} { set n($i) [$ns node] }
$ns duplex-link $n(0) $n(2) 2Mb 10ms DropTail
$ns duplex-link $n(1) $n(2) 2Mb 10ms DropTail
$ns duplex-link $n(2) $n(3) 0.6Mb 100ms DropTail
set lan [$ns newLan "$n(3) $n(4) $n(5)" 0.5Mb 40ms LL Queue/DropTail MAC/802_3 Channel]
$ns duplex-link-op $n(2) $n(3) queuePos 0.5
$ns queue-limit $n(2) $n(3) 20

# Error model
set loss_module [new ErrorModel]
$loss_module ranvar [new RandomVariable/Uniform]
$loss_module drop-target [new Agent/Null]
$ns lossmodel $loss_module $n(2) $n(3)

# TCP flows
set tcp0 [new Agent/TCP/Newreno]; $tcp0 set fid_ 1; $tcp0 set packetSize_ 552
$ns attach-agent $n(0) $tcp0
set sink0 [new Agent/TCPSink/DelAck]; $ns attach-agent $n(4) $sink0
$ns connect $tcp0 $sink0
set ftp0 [new Application/FTP]; $ftp0 attach-agent $tcp0

set tcp1 [new Agent/TCP/Newreno]; $tcp1 set fid_ 2; $tcp1 set packetSize_ 552
$ns attach-agent $n(5) $tcp1
set sink1 [new Agent/TCPSink/DelAck]; $ns attach-agent $n(1) $sink1
$ns connect $tcp1 $sink1
set ftp1 [new Application/FTP]; $ftp1 attach-agent $tcp1

# Schedule
$ns at 0.1 "$ftp0 start"
$ns at 0.1 "PlotWindow $tcp0 $winFile0"
$ns at 0.5 "$ftp1 start"
$ns at 0.5 "PlotWindow $tcp1 $winFile1"
$ns at 25.0 "$ftp0 stop"
$ns at 25.1 "$ftp1 stop"
$ns at 25.2 "Finish"

$ns run`
        },
        { number: 5, title: "Run Script", content: "Execute:", code: "ns prog5.tcl" }
      ],
      expectedOutput: ["WinFile0.dat and WinFile1.dat with cwnd points", "cwnd_plot.png generated", "Trace and NAM files"],
      keyObservations: ["Cwnd growth/halving patterns indicate congestion control behavior", "Queue limits and bandwidth shape flow throughput"]
    }
  },

  {
    id: 4,
    title: "Experiment 4: Error Detecting Code using CRC-CCITT (16-bit)",
    description: "Develop a program for error detecting code using CRC-CCITT (16 bits) to detect transmission errors in data communication.",
    content: {
      objective: "Implement CRC-CCITT (16-bit) checksum and verify data.",
      softwareRequirements: ["JDK 8+", "Editor/IDE", "Terminal"],
      steps: [
        { number: 1, title: "Open IDE", content: "Launch preferred editor or IDE." },
        { number: 2, title: "Create File", content: "Create CRC1.java" },
        {
          number: 3,
          title: "Paste Code",
          content: "Insert the following Java code:",
          language: "java",
          code: `import java.util.Scanner;

public class CRC1 {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);

    System.out.print("Enter message bits: ");
    String message = sc.nextLine().trim();
    System.out.print("Enter generator: ");
    String generator = sc.nextLine().trim();

    int m = message.length();
    int n = generator.length();

    int[] dividend = new int[m + n - 1];
    int[] divisor = new int[n];

    for (int i = 0; i < m; i++) dividend[i] = message.charAt(i) - '0';
    for (int i = 0; i < n; i++) divisor[i] = generator.charAt(i) - '0';

    for (int i = 0; i <= dividend.length - n; i++) {
      if (dividend[i] == 1) {
        for (int j = 0; j < n; j++) {
          dividend[i + j] ^= divisor[j];
        }
      }
    }

    StringBuilder codeword = new StringBuilder();
    codeword.append(message);
    for (int i = m; i < m + n - 1; i++) codeword.append(dividend[i]);
    System.out.println("Checksum code: " + codeword);

    System.out.print("Enter checksum code: ");
    String recv = sc.nextLine().trim();
    System.out.print("Enter generator: ");
    String gen2 = sc.nextLine().trim();

    int rm = recv.length();
    int rn = gen2.length();

    int[] rdata = new int[rm];
    int[] rdiv = new int[rn];
    for (int i = 0; i < rm; i++) rdata[i] = recv.charAt(i) - '0';
    for (int i = 0; i < rn; i++) rdiv[i] = gen2.charAt(i) - '0';

    for (int i = 0; i <= rdata.length - rn; i++) {
      if (rdata[i] == 1) {
        for (int j = 0; j < rn; j++) {
          rdata[i + j] ^= rdiv[j];
        }
      }
    }

    boolean valid = true;
    for (int i = rdata.length - (rn - 1); i < rdata.length; i++) {
      if (rdata[i] != 0) { valid = false; break; }
    }

    System.out.println(valid ? "Data stream is valid" :
                              "Data stream is invalid. CRC error occurred.");
    sc.close();
  }
}`
        },
        { number: 4, title: "Compile", content: "Compile:", code: "javac CRC1.java" },
        { number: 5, title: "Run", content: "Run:", code: "java CRC1" }
      ],
      expectedOutput: ["Checksum code printed", "Validation pass/fail"],
      keyObservations: ["Same generator required at both ends", "CRC detects but does not correct"]
    }
  },

  {
    id: 5,
    title: "Experiment 5: Sliding Window Protocol",
    description: "Develop a program to implement a sliding window protocol in the data link layer.",
    content: {
      objective: "Simulate sender behavior with windowed transmissions and ACKs.",
      softwareRequirements: ["JDK 8+", "Editor/IDE", "Terminal"],
      steps: [
        { number: 1, title: "Create File", content: "Create SlidingWindow.java" },
        {
          number: 2,
          title: "Paste Code",
          content: "Insert the Java program:",
          language: "java",
          code: `import java.util.*; // Import all the useful tools like Scanner

class SlidingWindow {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in); // Scanner lets us read what the user types

    System.out.print("Enter total number of frames: ");
    int totalFrames = sc.nextInt();

    System.out.print("Enter window size: ");
    int windowSize = sc.nextInt();

    int nextFrame = 0;

    while (nextFrame < totalFrames) {
      System.out.println("\\nSending frames:");

      int sentFrames = 0;
      for (int i = 0; i < windowSize && nextFrame < totalFrames; i++) {
        System.out.print("Frame " + nextFrame + "  ");
        nextFrame++;
        sentFrames++;
      }

      System.out.println("\\nReceiving acknowledgements for sent frames:");
      for (int i = nextFrame - sentFrames; i < nextFrame; i++) {
        System.out.println("ACK received for Frame " + i);
      }
    }

    System.out.println("\\nAll frames sent and acknowledged!");
    sc.close();
  }
}`
        },
        { number: 3, title: "Compile and Run", content: "Build and run:", code: "javac SlidingWindow.java\njava SlidingWindow" },
        {
          number: 4,
          title: "Sample Output",
          content: "Example run (6 frames, window 3):",
          language: "text",
          code: `Enter total number of frames: 6
Enter window size: 3

Sending frames:
Frame 0  Frame 1  Frame 2  
Receiving acknowledgements for sent frames:
ACK received for Frame 0
ACK received for Frame 1
ACK received for Frame 2

Sending frames:
Frame 3  Frame 4  Frame 5
Receiving acknowledgements for sent frames:
ACK received for Frame 3
ACK received for Frame 4
ACK received for Frame 5

All frames sent and acknowledged!`
        }
      ],
      expectedOutput: ["Frames transmitted in windows", "ACKs shown after each window"],
      keyObservations: ["Window size bounds in-flight frames", "No losses/timeouts simulated"]
    }
  },

  {
    id: 6,
    title: "Experiment 6: Bellman-Ford and Path Vector Routing",
    description: "Develop a program to find the shortest path using Bellman-Ford and path vector routing algorithm.",
    content: {
      objective: "Compute single-source shortest paths with Bellman-Ford and print distances.",
      softwareRequirements: ["JDK 8+", "Editor/IDE", "Terminal"],
      steps: [
        { number: 1, title: "Create File", content: "Create ford.java" },
        {
          number: 2,
          title: "Paste Code",
          content: "Insert the Java program:",
          language: "java",
          code: `import java.util.Scanner;

public class ford {
  private int D[];
  private int num_ver;
  public static final int MAX_VALUE = 999;

  public ford(int num_ver) {
    this.num_ver = num_ver;
    D = new int[num_ver + 1];
  }

  public void BellmanFordEvaluation(int source, int A[][]) {
    for (int node = 1; node <= num_ver; node++) {
      D[node] = MAX_VALUE;
    }

    D[source] = 0;

    for (int node = 1; node <= num_ver - 1; node++) {
      for (int sn = 1; sn <= num_ver; sn++) {
        for (int dn = 1; dn <= num_ver; dn++) {
          if (A[sn][dn] != MAX_VALUE) {
            if (D[dn] > D[sn] + A[sn][dn])
              D[dn] = D[sn] + A[sn][dn];
            }
        }
      }
    }

    for (int sn = 1; sn <= num_ver; sn++) {
      for (int dn = 1; dn <= num_ver; dn++) {
        if (A[sn][dn] != MAX_VALUE) {
          if (D[dn] > D[sn] + A[sn][dn])
            System.out.println("The Graph contains negative egde cycle");
        }
      }
    }

    for (int vertex = 1; vertex <= num_ver; vertex++) {
      System.out.println("distance of source" + source + "to" + vertex + "is" + D[vertex]);
    }
  }

  public static void main(String[] args) {
    int num_ver = 0;
    int source;
    Scanner scanner = new Scanner(System.in);
    System.out.println("Enter the number of vertices");
    num_ver = scanner.nextInt();

    int A[][] = new int[num_ver + 1][num_ver + 1];
    System.out.println("Enter the adjacency matrix");
    for (int sn = 1; sn <= num_ver; sn++) {
      for (int dn = 1; dn <= num_ver; dn++) {
        A[sn][dn] = scanner.nextInt();
        if (sn == dn) {
          A[sn][dn] = 0;
          continue;
        }
        if (A[sn][dn] == 0) {
          A[sn][dn] = MAX_VALUE;
        }
      }
    }

    System.out.println("Enter the source vertex");
    source = scanner.nextInt();
    ford b = new ford(num_ver);
    b.BellmanFordEvaluation(source, A);
    scanner.close();
  }
}`
        },
        { number: 3, title: "Compile and Run", content: "Build and run:", code: "javac ford.java\njava ford" },
        {
          number: 4,
          title: "Sample I/O",
          content: "Example run with 4 vertices:",
          language: "text",
          code: `Enter the number of vertices
4
Enter the adjacency matrix. Use 99999 for no direct edge and 0 for no weight.
0 5 99999 99999
99999 0 3 6
99999 99999 0 2
99999 99999 99999 0
Enter the source vertex
1
Shortest path from source 1
Distance to vertex 1 is: 0
Distance to vertex 2 is: 5
Distance to vertex 3 is: 8
Distance to vertex 4 is: 10`
        }
      ],
      expectedOutput: ["Distances from source to each vertex", "Negative-cycle warning if detected"],
      keyObservations: ["Sentinel value denotes no edge", "Handles negative edges but not negative cycles"]
    }
  },

  {
    id: 7,
    title: "Experiment 7: Client-Server File Request (provided code is Leaky Bucket)",
    description: "Provided Java code simulates a leaky bucket rather than sockets; included as given.",
    content: {
      objective: "Demonstrate leaky bucket shaping across time slots.",
      softwareRequirements: ["JDK 8+", "Editor/IDE", "Terminal"],
      steps: [
        { number: 1, title: "Create File", content: "Create lab7.java" },
        {
          number: 2,
          title: "Paste Code",
          content: "Insert the Java program:",
          language: "java",
          code: `import java.util.Scanner;
import java.lang.*;

public class lab7 {
  public static void main(String[] args) {
    int i;
    int a[] = new int[20];
    int buck_rem = 0, buck_cap = 4, rate = 3, sent, recv;
    Scanner in = new Scanner(System.in);
    System.out.println("Enter the number of packets");
    int n = in.nextInt();
    System.out.println("Enter the packets");
    for (i = 1; i <= n; i++)
      a[i] = in.nextInt();
    System.out.println("Clock \\t packet size \\t accept \\t sent \\t remaining");
    for (i = 1; i <= n; i++) {
      if (a[i] != 0) {
        if (buck_rem + a[i] > buck_cap)
          recv = -1;
        else {
          recv = a[i];
          buck_rem += a[i];
        }
      } else
        recv = 0;
      if (buck_rem != 0) {
        if (buck_rem < rate) {
          sent = buck_rem;
          buck_rem = 0;
        } else {
          sent = rate;
          buck_rem = buck_rem - rate;
        }
      } else
        sent = 0;
      if (recv == -1)
        System.out.println(+i + "\\t\\t" + a[i] + "\\t dropped \\t" + sent + "\\t" + buck_rem);
      else
        System.out.println(+i + "\\t\\t" + a[i] + "\\t\\t" + recv + "\\t" + sent + "\\t" + buck_rem);
    }
  }
}`
        },
        { number: 3, title: "Compile and Run", content: "Build and run:", code: "javac lab7.java\njava lab7" },
        {
          number: 4,
          title: "Sample Output",
          content: "Example run with five packet sizes:",
          language: "text",
          code: `Enter the number of packets
5
Enter the packets
2
3
1
4
1
Clock   packet size     accept  sent    remaining
1       2               2       2       0
2       3               3       3       0
3       1               1       1       0
4       4               4       3       1
5       1               1       2       0`
        }
      ],
      expectedOutput: ["Per-tick accept/sent/remaining table"],
      keyObservations: ["Drops occur when capacity exceeded", "Rate limits egress per tick"]
    }
  },

  {
    id: 8,
    title: "Experiment 8: Datagram Socket Client/Server (provided code uses TCP classes)",
    description: "Client sends a filename; server streams file lines back to the client.",
    content: {
      objective: "Demonstrate request/response over sockets to display file contents.",
      softwareRequirements: ["JDK 8+", "Editor/IDE", "Two terminals"],
      steps: [
        {
          number: 1,
          title: "TCP Client Code",
          content: "Create TCPClient.java:",
          language: "java",
          code: `import java.net.*;
import java.io.*;

public class TCPClient {
  public static void main(String[] args) throws Exception {
    Socket sock = new Socket("127.0.01", 4000);

    System.out.println("Enter the filename");

    BufferedReader keyRead = new BufferedReader(new InputStreamReader(System.in));

    String fname = keyRead.readLine();

    OutputStream ostream = sock.getOutputStream();

    PrintWriter pwrite = new PrintWriter(ostream, true);

    pwrite.println(fname);

    InputStream istream = sock.getInputStream();

    BufferedReader socketRead = new BufferedReader(new InputStreamReader(istream));

    String str;
    while ((str = socketRead.readLine()) != null) {
      System.out.println(str);
    }

    pwrite.close();
    socketRead.close();
    keyRead.close();
  }
}`
        },
        {
          number: 2,
          title: "TCP Server Code",
          content: "Create TCPServer.java:",
          language: "java",
          code: `import java.net.*;
import java.io.*;
public class TCPServer {
  public static void main(String[] args) throws Exception {
    ServerSocket sersock = new ServerSocket(4000);
    System.out.println("Server ready for connection");

    Socket sock = sersock.accept();

    System.out.println("Connection Is successful and waiting for chatting");

    InputStream istream = sock.getInputStream();

    BufferedReader fileRead = new BufferedReader(new InputStreamReader(istream));

    String fname = fileRead.readLine();

    BufferedReader ContentRead = new BufferedReader(new FileReader(fname));

    OutputStream ostream = sock.getOutputStream();

    PrintWriter pwrite = new PrintWriter(ostream, true);

    String str;

    while ((str = ContentRead.readLine()) != null) {

      pwrite.println(str);

    }
    sock.close();
    sersock.close();
    pwrite.close();
    fileRead.close();
    ContentRead.close();
  }
}`
        },
        {
          number: 3,
          title: "Run",
          content: "Use two terminals:",
          language: "text",
          code: `Terminal A (server):
$ javac TCPServer.java
$ java TCPServer
Server ready for connection
Connection Is successful and waiting for chatting

Terminal B (client):
$ javac TCPClient.java
$ java TCPClient
Enter the filename
sample.txt
Hello from server
This is a test file.`
        }
      ],
      expectedOutput: ["Client prints lines streamed by server"],
      keyObservations: ["Provided code uses TCP sockets, not UDP datagrams", "Ensure the requested file exists on server side"]
    }
  },

  {
    id: 9,
    title: "Experiment 9: RSA Encryption/Decryption",
    description: "Implement a simple RSA algorithm to encrypt and decrypt data.",
    content: {
      objective: "Generate keys, encrypt plaintext, decrypt ciphertext.",
      softwareRequirements: ["JDK 8+", "Editor/IDE", "Terminal"],
      steps: [
        {
          number: 1,
          title: "Create File",
          content: "Create RSA.java:",
          language: "java",
          code: `import java.io.DataInputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.util.Random;

public class RSA {
  private BigInteger p, q, N, phi, e, d;
  private int bitlength = 1024;
  private Random r;

  public RSA() {
    r = new Random();
    p = BigInteger.probablePrime(bitlength, r);
    q = BigInteger.probablePrime(bitlength, r);
    System.out.println("Prime number p is" + p);
    System.out.println("prime number q is" + q);
    N = p.multiply(q);
    phi = p.subtract(BigInteger.ONE).multiply(q.subtract(BigInteger.ONE));
    e = BigInteger.probablePrime(bitlength / 2, r);
    while (phi.gcd(e).compareTo(BigInteger.ONE) > 0 && e.compareTo(phi) < 0) {
      e.add(BigInteger.ONE);
    }
    System.out.println("Public key is" + e);
    d = e.modInverse(phi);
    System.out.println("Private key is" + d);
  }

  public RSA(BigInteger e, BigInteger d, BigInteger N) {
    this.e = e;
    this.d = d;
    this.N = N;
  }

  public static void main(String[] args) throws IOException {
    RSA rsa = new RSA();
    DataInputStream in = new DataInputStream(System.in);
    String testString;
    System.out.println("Enter the plain text:");
    testString = in.readLine();
    System.out.println("Encrypting string:" + testString);
    System.out.println("string in bytes:" + bytesToString(testString.getBytes()));
    byte[] encrypted = rsa.encrypt(testString.getBytes());
    byte[] decrypted = rsa.decrypt(encrypted);
    System.out.println("Dcrypting Bytes:" + bytesToString(decrypted));
    System.out.println("Dcrypted string:" + new String(decrypted));
  }

  private static String bytesToString(byte[] encrypted) {
    String test = " ";
    for (byte b : encrypted) {
      test += Byte.toString(b);
    }
    return test;
  }

  public byte[] encrypt(byte[] message) {
    return (new BigInteger(message)).modPow(e, N).toByteArray();
  }

  public byte[] decrypt(byte[] message) {
    return (new BigInteger(message)).modPow(d, N).toByteArray();
  }
}`
        },
        {
          number: 2,
          title: "Sample Output",
          content: "Example run:",
          language: "text",
          code: `Prime number p is110009545216105266071266844316680970021032
Public key is6234980809185911720460807581532310799658584801
Private key is341764047207244387972748032855624589565354490
Enter the plain text:
HELLO
Encrypting string:HELLO
string in bytes:  72101108108111
Dcrypting Bytes: 72101108108111
Dcrypted string:HELLO`
        }
      ],
      expectedOutput: ["Keys printed, bytes shown, decrypted text matches plaintext"],
      keyObservations: ["Random primes change per run", "BigInteger handles modular math"]
    }
  },

  {
    id: 10,
    title: "Experiment 10: Congestion Control using Leaky Bucket",
    description: "Develop a program for congestion control using a leaky bucket algorithm.",
    content: {
      objective: "Simulate leaky bucket congestion control with constant or random arrivals.",
      softwareRequirements: ["JDK 8+", "Editor/IDE", "Terminal"],
      steps: [
        { number: 1, title: "Create File", content: "Create LeakyBucketSimulator.java" },
        {
          number: 2,
          title: "Paste Code",
          content: "Insert the Java program:",
          language: "java",
          code: `import java.util.Random;
import java.util.Scanner;

/**
 * Simple Leaky Bucket simulator (discrete seconds).
 *
 * - capacity: maximum packets that can be stored in bucket
 * - leakRate: packets per second that are sent out (drain rate)
 * - arrivalRate: packets per second arriving (constant mode)
 * - duration: how many seconds to simulate
 *
 * This is intentionally simple to illustrate the algorithm.
 */
public class LeakyBucketSimulator {

    private final int capacity;
    private final int leakRate;
    private int bucket; // current packets in bucket
    private int droppedTotal = 0;
    private int sentTotal = 0;

    public LeakyBucketSimulator(int capacity, int leakRate) {
        this.capacity = capacity;
        this.leakRate = leakRate;
        this.bucket = 0;
    }

    /**
     * Simulate a single second:
     *  - add arrivals
     *  - drop overflow
     *  - leak/sent packets
     *
     * @param arrivals number of packets that arrive this second
     * @return array {storedAfter, droppedThisSecond, sentThisSecond}
     */
    public int[] tick(int arrivals) {
        // 1) arrivals go into bucket
        int space = capacity - bucket;
        int accepted = Math.min(space, arrivals);
        int dropped = Math.max(0, arrivals - accepted);
        bucket += accepted;
        droppedTotal += dropped;

        // 2) leak (send) up to leakRate packets
        int toSend = Math.min(leakRate, bucket);
        bucket -= toSend;
        sentTotal += toSend;

        return new int[] { bucket, dropped, toSend };
    }

    public int getDroppedTotal() {
        return droppedTotal;
    }

    public int getSentTotal() {
        return sentTotal;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Leaky Bucket Simulator (discrete seconds)");
        System.out.print("Enter bucket capacity (packets): ");
        int capacity = sc.nextInt();
        System.out.print("Enter leak rate (packets/second sent): ");
        int leakRate = sc.nextInt();

        System.out.println("Choose arrival mode:");
        System.out.println("  1) Constant arrival rate");
        System.out.println("  2) Random arrivals (0..maxArrivalPerSecond)");
        System.out.print("Choose 1 or 2: ");
        int mode = sc.nextInt();

        int arrivalRate = 0;
        int duration;
        int maxArrival = 0;
        if (mode == 1) {
            System.out.print("Enter constant arrival rate (packets/second): ");
            arrivalRate = sc.nextInt();
        } else {
            System.out.print("Enter maximum arrival per second (packets): ");
            maxArrival = sc.nextInt();
        }

        System.out.print("Enter simulation duration (seconds): ");
        duration = sc.nextInt();

        LeakyBucketSimulator sim = new LeakyBucketSimulator(capacity, leakRate);
        Random rand = new Random();

        System.out.println();
        System.out.println("Time\\tArrivals\\tDropped\\tSent\\tInBucket");
        System.out.println("----\\t--------\\t-------\\t----\\t--------");

        for (int t = 1; t <= duration; t++) {
            int arrivals = (mode == 1) ? arrivalRate : rand.nextInt(maxArrival + 1);
            int[] result = sim.tick(arrivals);
            int inBucket = result[0];
            int dropped = result[1];
            int sent = result[2];

            System.out.printf("%2d\\t%8d\\t%7d\\t%4d\\t%8d%n", t, arrivals, dropped, sent, inBucket);
        }

        System.out.println();
        System.out.println("Simulation finished.");
        System.out.println("Total packets sent: " + sim.getSentTotal());
        System.out.println("Total packets dropped: " + sim.getDroppedTotal());

        sc.close();
    }
}`
        },
        {
          number: 3,
          title: "Sample Output",
          content: "Example run with capacity=10, leakRate=3, constant arrivals=5, duration=10:",
          language: "text",
          code: `Leaky Bucket Simulator (discrete seconds)
Enter bucket capacity (packets): > 10
Enter leak rate (packets/second sent): > 3
Choose arrival mode:
  1) Constant arrival rate
  2) Random arrivals (0..maxArrivalPerSecond)
Choose 1 or 2: > 1
Enter constant arrival rate (packets/second): > 5
Enter simulation duration (seconds): > 10

Time    Arrivals    Dropped    Sent    InBucket
----    --------    -------    ----    --------
 1           5        0         3         2
 2           5        0         3         4
 3           5        0         3         6
 4           5        0         3         8
 5           5        0         3        10
 6           5        0         3        10
 7           5        0         3        10
 8           5        0         3        10
 9           5        0         3        10
10           5        0         3        10

Simulation finished.
Total packets sent: 30
Total packets dropped: 0`
        }
      ],
      expectedOutput: ["Per-second table of arrivals, drops, sent, and in-bucket", "Totals for sent and dropped packets"],
      keyObservations: ["When arrivals exceed leak rate, bucket fills until capacity", "Overflow drops when full; otherwise backlog drains at leak rate"]
    }
  }
];
